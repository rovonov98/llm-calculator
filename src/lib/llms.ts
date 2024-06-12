interface LLM {
  name: string;
  token_price: {
    input: number;
    output: number;
  };
  context: {
    total: number;
    message: number;
  };
}

interface LLMGroup {
  group: string;
  models: LLM[];
}

export const llms: LLMGroup[] = [
  {
    group: "OpenAI",
    models: [
      {
        name: "gpt-4o",
        token_price: {
          input: 5.0,
          output: 15.0,
        },
        context: {
          total: 128_000,
          message: 4096,
        },
      },
      {
        name: "gpt-4o-2024-05-13",
        token_price: {
          input: 5.0,
          output: 15.0,
        },
        context: {
          total: 128_000,
          message: 4096,
        },
      },
      {
        name: "gpt-4-turbo",
        token_price: {
          input: 10.0,
          output: 30.0,
        },
        context: {
          total: 128_000,
          message: 4096,
        },
      },
      {
        name: "gpt-3.5-turbo-0125",
        token_price: {
          input: 0.5,
          output: 1.5,
        },
        context: {
          total: 16_385,
          message: 4096,
        },
      },
      {
        name: "gpt-3.5-turbo-instruct",
        token_price: {
          input: 1.5,
          output: 2.0,
        },
        context: {
          total: 4_096,
          message: 4096,
        },
      },
    ],
  },
  {
    group: "Anthropic",
    models: [
      {
        name: "Claude 3 Opus",
        token_price: {
          input: 15,
          output: 75,
        },
        context: {
          total: 200_000,
          message: 0,
        },
      },
      {
        name: "Claude 3 Sonnet",
        token_price: {
          input: 3,
          output: 15,
        },
        context: {
          total: 200_000,
          message: 0,
        },
      },
      {
        name: "Claude 3 Haiku",
        token_price: {
          input: 0.25,
          output: 1.25,
        },
        context: {
          total: 200_000,
          message: 0,
        },
      },
    ],
  },
  {
    group: "Google",
    models: [
      {
        name: "Gemini 1.5 Pro",
        token_price: {
          input: 3.5,
          output: 10.5,
        },
        context: {
          total: 1_000_000,
          message: 0,
        },
      },
      {
        name: "Gemini 1.5 Flash",
        token_price: {
          input: 0.35,
          output: 1.05,
        },
        context: {
          total: 128_000,
          message: 0,
        },
      },
      {
        name: "Gemini 1.0 Pro",
        token_price: {
          input: 0.5,
          output: 1.5,
        },
        context: {
          total: 128_000,
          message: 0,
        },
      },
    ],
  },
  {
    group: "Mistral AI",
    models: [
      {
        name: "open-mixtral-8x22b",
        token_price: {
          input: 2,
          output: 6,
        },
        context: {
          total: 65_536,
          message: 4096,
        },
      },
      {
        name: "open-mixtral-8x7b",
        token_price: {
          input: 0.7,
          output: 0.7,
        },
        context: {
          total: 32_000,
          message: 0,
        },
      },
      {
        name: "open-mistral-7b",
        token_price: {
          input: 0.25,
          output: 0.25,
        },
        context: {
          total: 8_192,
          message: 0,
        },
      },
    ],
  },
];
