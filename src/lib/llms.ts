export interface TLLM {
  name: string;
  group: string;
  token_price: {
    input: number;
    output: number;
  };
  context: {
    total_message?: string;
    total: number;
    message: number;
  };
}

export const llms: TLLM[] = [
  {
    group: "OpenAI",
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
    group: "OpenAI",
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
    group: "OpenAI",
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
    group: "OpenAI",
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
    group: "OpenAI",
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

  {
    group: "Anthropic",
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
    group: "Anthropic",
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
    group: "Anthropic",
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
  {
    group: "Google",
    name: "Gemini 1.5 Pro",
    token_price: {
      input: 7,
      output: 21,
    },
    context: {
      total_message: "128,000 - 1,000,000",

      total: 1_000_000,
      message: 0,
    },
  },
  {
    group: "Google",
    name: "Gemini 1.5 Pro",
    token_price: {
      input: 3.5,
      output: 10.5,
    },
    context: {
      total_message: "1 - 128,000",
      total: 128_000,
      message: 0,
    },
  },
  {
    group: "Google",
    name: "Gemini 1.5 Flash",
    token_price: {
      input: 0.7,
      output: 2.1,
    },
    context: {
      total_message: "128,000 - 1,000,000",
      total: 1_000_000,
      message: 0,
    },
  },
  {
    group: "Google",
    name: "Gemini 1.5 Flash",
    token_price: {
      input: 0.35,
      output: 1.05,
    },
    context: {
      total_message: "1 - 128,000",
      total: 128_000,
      message: 0,
    },
  },
  {
    group: "Google",
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
  {
    group: "Meta",
    name: "Llama 3 70B Instruct",
    token_price: {
      input: 0.9,
      output: 0.9,
    },
    context: {
      total: 8_192,
      message: 8_192,
    },
  },
  {
    group: "Mistral AI",
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
    group: "Mistral AI",
    name: "open-mixtral-8x7b",
    token_price: {
      input: 0.7,
      output: 0.7,
    },
    context: {
      total: 32_768,
      message: 0,
    },
  },
  {
    group: "Mistral AI",
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
];
