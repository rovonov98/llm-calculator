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
import { TLLM, llms } from "@/lib/llms";
import { Fragment, ReactNode, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import icon from "@/app/icon.svg";
import googleLogo from "@/app/google_logo.svg";
import openaiLogo from "@/app/openai_logo.svg";
import anthropicLogo from "@/app/anthropic_logo.png";
import mistralLogo from "@/app/mistral_logo.svg";
import metaLogo from "@/app/meta_logo.svg";
import groqLogo from "@/app/groq_logo.png";
import deepinfraLogo from "@/app/deepinfra_logo.webp";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";

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
    case "meta": {
      return metaLogo.src;
    }
    case "deepinfra": {
      return deepinfraLogo.src;
    }
    case "groq": {
      return groqLogo.src;
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

const groupToOrder = (group: string) => {
  switch (group.toLowerCase()) {
    case "openai": {
      return 1;
    }
    case "anthropic": {
      return 2;
    }
    case "google": {
      return 3;
    }
    case "meta": {
      return 4;
    }
    case "mistral ai": {
      return 5;
    }
    default: {
      return 6;
    }
  }
};

interface TExtendedLLM extends TLLM {
  total: number;
  per_call: number;
}

export default function Home() {
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [state, setState] = useState(() => ({
    // input_tokens: 1000,
    input_tokens: 1000,
    output_tokens: 1000,
    multiplier: 0.001,
    api_calls: 20,
    tokenMultiplier: 1,
  }));

  //   useLayoutEffect(() => {
  //     setState({
  //       input_tokens: Number(localStorage.getItem("input_tokens") || 1000),
  //       output_tokens: Number(localStorage.getItem("output_tokens") || 1000),
  //       multiplier: 0.001,
  //       api_calls: Number(localStorage.getItem("api_calls") || 20),
  //       tokenMultiplier: 1,
  //     });
  //   }, [setState]);

  const sorted = useMemo<TExtendedLLM[]>(() => {
    const sortPath = sortBy.split(".");
    return llms
      .map((llm) => ({
        ...llm,
        total:
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
            iso_wheel,
        per_call:
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
            iso_wheel,
      }))
      .sort((a, b) => {
        const valueA = sortPath.reduce((prev, next) => {
          // @ts-ignore
          return prev[next];
        }, a);
        const valueB = sortPath.reduce((prev, next) => {
          // @ts-ignore
          return prev[next];
        }, b);

        if (sortBy === "name") {
          return sortOrder === "asc"
            ? groupToOrder(b.group) - groupToOrder(a.group)
            : groupToOrder(a.group) - groupToOrder(b.group);
        }

        if (typeof valueA !== "number" || typeof valueB !== "number") {
          return sortOrder === "asc"
            ? // @ts-ignore
              valueA.localeCompare(valueB)
            : // @ts-ignore
              valueB.localeCompare(valueA);
        }

        if (sortOrder === "asc") {
          // @ts-ignore
          return valueA - valueB;
        } else {
          // @ts-ignore
          return valueB - valueA;
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, sortBy, sortOrder]);

  const multiplierMapper: { [key: number]: string } = {
    1: "tokens",
    0.25: "characters",
    1.33: "words",
  };

  const sortingButton = (field: string) => {
    return (
      <Button
        size="icon"
        variant={sortBy === field ? "default" : "ghost"}
        onClick={() => {
          if (sortBy === field) {
            setSortOrder((prevSort) => {
              return prevSort === "asc" ? "desc" : "asc";
            });
          } else {
            setSortOrder("desc");
          }

          setSortBy(field);
        }}
        className="w-6 h-6"
      >
        {field === sortBy ? (
          <>
            {sortOrder === "desc" ? (
              <ArrowDownUp size={16} className="shrink-0" />
            ) : (
              <ArrowUpDown size={16} className="shrink-0" />
            )}
          </>
        ) : (
          <ArrowUpDown size={16} className="shrink-0 opacity-70" />
        )}
      </Button>
    );
  };

  const Header = ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    return (
      <div className={clsx("flex gap-2 items-center", className)}>
        {children}
      </div>
    );
  };

  return (
    <>
      <header className="flex items-center gap-3 text-2xl font-bold px-8 py-4">
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
        <h1 className="text-4xl font-bold mb-8 text-center">
          LLM pricing calculator
        </h1>
        <h2 className="max-w-[960px] text-lg font-bold text-center mb-8">
          Calculate and compare the cost of using OpenAI Chatgpt, Anthropic
          Claude, Meta Llama 3, Google Gemini, and Mistral LLM APIs with this
          simple and powerful free calculator. Latest numbers as of June 2024.
        </h2>
        <form className="flex gap-4">
          <div>
            <Label htmlFor="input_tokens">
              Input {multiplierMapper[state.tokenMultiplier]}
            </Label>
            <Input
              id="input_tokens"
              name="input_tokens"
              value={state.input_tokens}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                localStorage.setItem("input_tokens", val);
                setState((state) => ({
                  ...state,
                  input_tokens: Number(val),
                }));
              }}
            />
          </div>
          <div>
            <Label htmlFor="output_tokens">
              Output {multiplierMapper[state.tokenMultiplier]}
            </Label>
            <Input
              id="output_tokens"
              name="output_tokens"
              value={state.output_tokens}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                localStorage.setItem("output_tokens", val);
                setState((state) => ({
                  ...state,
                  output_tokens: Number(val),
                }));
              }}
            />
          </div>
          <div>
            <Label htmlFor="api_calls">API calls</Label>
            <Input
              id="api_calls"
              name="api_calls"
              value={state.api_calls}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                localStorage.setItem("api_calls", val);
                setState((state) => ({
                  ...state,
                  api_calls: Number(val),
                }));
              }}
            />
          </div>
        </form>
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
        <div className="relative w-full max-w-[1024px]">
          <Table className="w-full sticky top-0">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] md:w-[200px]">
                  <Header>Name {sortingButton("name")}</Header>
                </TableHead>
                <TableHead>
                  <Header>
                    Context window {sortingButton("context.total")}
                  </Header>
                </TableHead>
                <TableHead>
                  <Header>
                    Input / 1k Tokens {sortingButton("token_price.input")}
                  </Header>
                </TableHead>
                <TableHead>
                  <Header>
                    Output / 1k Tokens {sortingButton("token_price.output")}
                  </Header>
                </TableHead>
                <TableHead>
                  <Header className="justify-end">
                    Per call {sortingButton("per_call")}
                  </Header>
                </TableHead>
                <TableHead>
                  <Header className="justify-end">
                    Total {sortingButton("total")}
                  </Header>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((llm, index) => (
                <TableRow key={llm.name + index}>
                  <TableCell className="font-medium">
                    <div className="flex gap-2 items-center">
                      {llm.provider ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={groupToLogo(llm.provider)}
                            alt={llm.provider}
                            title={llm.provider}
                            decoding="async"
                            width={20}
                            height={20}
                            style={{ height: 20, width: 20 }}
                          />
                          +
                        </>
                      ) : null}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={groupToLogo(llm.group)}
                        alt={llm.group}
                        title={llm.group}
                        decoding="async"
                        width={20}
                        height={20}
                        style={{ height: 20, width: 20 }}
                      />
                      {llm.name}
                    </div>
                  </TableCell>

                  <TableCell>
                    {/* {llm.context.total_message || */}
                    {llm.context.total.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell>
                    $
                    {(llm.token_price.input * iso_wheel * state.multiplier) /
                      iso_wheel}
                  </TableCell>
                  <TableCell>
                    $
                    {(llm.token_price.output * iso_wheel * state.multiplier) /
                      iso_wheel}
                  </TableCell>
                  <TableCell className="text-right lg:min-w-[130px]">
                    ${llm.per_call.toFixed(7).replace(/\.?0+$/, "")}
                  </TableCell>
                  <TableCell className="text-right lg:min-w-[130px]">
                    ${llm.total.toFixed(7).replace(/\.?0+$/, "")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
