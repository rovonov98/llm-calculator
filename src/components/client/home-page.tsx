"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { llms } from "@/lib/llms";
import { Fragment, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import icon from "@/app/icon.svg";
import googleLogo from "@/app/google_logo.svg";
import openaiLogo from "@/app/openai_logo.svg";
import anthropicLogo from "@/app/anthropic_logo.png";
import mistralLogo from "@/app/mistral_logo.svg";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";

const iso_wheel = 10_000_000;
const multiplier_per_one = 0.000_001;

const groupToLogo = (name: string) => {
  const lower = name.toLowerCase();

  switch (lower) {
    case "google": {
      return googleLogo.src;
    }
    case "openai": {
      return openaiLogo.src;
    }
    case "anthropic": {
      return anthropicLogo.src;
    }
    case "mistral ai": {
      return mistralLogo.src;
    }
    default: {
      return "";
    }
  }
};

const tokenMultiplier = (type: string) => {
  switch (type) {
    case "token": {
      return 1;
    }
    case "word": {
      return 1.33;
    }
    case "char": {
      return 0.25;
    }
    default: {
      return 1;
    }
  }
};

export default function Home() {
  const [sortBy, setSortBy] = useState("");
  const [state, setState] = useState({
    input_tokens: 1000,
    output_tokens: 1000,
    multiplier: 0.001,
    api_calls: 10,
    tokenMultiplier: 1,
  });

  const multiplierMapper: { [key: number]: string } = {
    1: "tokens",
    0.25: "characters",
    1.33: "words",
  };

  return (
    <>
      <header className="flex items-center gap-3 text-2xl font-bold px-8 py-4 shadow-md">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon.src}
            alt={"home"}
            width={40}
            height={40}
            style={{ height: 40, width: 40 }}
          />
        </Link>
        Calculator
      </header>
      <main className="flex w-full h-full flex-col items-center justify-between gap-4 p-2 md:p-10">
        <h1 className="text-4xl font-bold mb-8">LLM pricing calculator</h1>
        <div className="flex gap-4">
          <div>
            <Label htmlFor="input_tokens">
              Input {multiplierMapper[state.tokenMultiplier]}
            </Label>
            <Input
              name="input_tokens"
              value={state.input_tokens}
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  input_tokens: Number(e.target.value.replace(/\D/g, "")),
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="output_tokens">
              Output {multiplierMapper[state.tokenMultiplier]}
            </Label>
            <Input
              name="output_tokens"
              value={state.output_tokens}
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  output_tokens: Number(e.target.value.replace(/\D/g, "")),
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="api_calls">API calls</Label>
            <Input
              name="api_calls"
              value={state.api_calls}
              onChange={(e) =>
                setState((state) => ({
                  ...state,
                  api_calls: Number(e.target.value.replace(/\D/g, "")),
                }))
              }
            />
          </div>
        </div>
        <div>
          <Tabs
            defaultValue="token"
            className="w-full"
            onValueChange={(value) => {
              setState((state) => ({
                ...state,
                tokenMultiplier: tokenMultiplier(value),
              }));
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="token">Tokens</TabsTrigger>
              <TabsTrigger value="word">Words</TabsTrigger>
              <TabsTrigger value="char">Characters</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="relative w-full max-w-[960px]">
          <Table className="w-full sticky top-0">
            <TableCaption>LLM pricing table</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] md:w-[200px]">Name</TableHead>
                <TableHead>Context window</TableHead>
                <TableHead>Input / 1k Tokens</TableHead>
                <TableHead>Output / 1k Tokens</TableHead>
                <TableHead className="text-right">Per call</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {llms.map((group) => (
                <Fragment key={group.group}>
                  {group.models.map((llm) => (
                    <TableRow key={llm.name}>
                      <TableCell className="font-medium">
                        <div className="flex gap-2 items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={groupToLogo(group.group)}
                            alt={group.group}
                            title={group.group}
                            decoding="async"
                            width={20}
                            height={20}
                            style={{ height: 20, width: 20 }}
                          />
                          {llm.name}
                        </div>
                      </TableCell>

                      <TableCell>
                        {llm.context.total.toLocaleString("en-US")}
                      </TableCell>
                      <TableCell>
                        $
                        {(llm.token_price.input *
                          iso_wheel *
                          state.multiplier) /
                          iso_wheel}
                      </TableCell>
                      <TableCell>
                        $
                        {(llm.token_price.output *
                          iso_wheel *
                          state.multiplier) /
                          iso_wheel}
                      </TableCell>
                      <TableCell className="text-right lg:min-w-[150px]">
                        $
                        {(
                          (llm.token_price.input *
                            iso_wheel *
                            state.input_tokens *
                            state.tokenMultiplier *
                            multiplier_per_one) /
                            iso_wheel +
                          (llm.token_price.output *
                            iso_wheel *
                            state.output_tokens *
                            state.tokenMultiplier *
                            multiplier_per_one) /
                            iso_wheel
                        )
                          .toFixed(7)
                          .replace(/\.?0+$/, "")}
                      </TableCell>
                      <TableCell className="text-right lg:min-w-[150px]">
                        $
                        {(
                          (llm.token_price.input *
                            iso_wheel *
                            state.input_tokens *
                            state.tokenMultiplier *
                            state.api_calls *
                            multiplier_per_one) /
                            iso_wheel +
                          (llm.token_price.output *
                            iso_wheel *
                            state.output_tokens *
                            state.tokenMultiplier *
                            state.api_calls *
                            multiplier_per_one) /
                            iso_wheel
                        )
                          .toFixed(7)
                          .replace(/\.?0+$/, "")}
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
