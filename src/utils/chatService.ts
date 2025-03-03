import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatResponse = async (
  messages: { role: "user" | "assistant" | "system"; content: string }[]
) => {
  if (!messages.some((msg) => msg.role === "system")) {
    messages.unshift({
      role: "system",
      content:
        "You are Charlie, a friendly personal assistant. Answer questions as if you are Charlie and always introduce yourself as Charlie when asked for your name.",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    return response.choices[0]?.message?.content || "No response from AI.";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("OpenAI API error:", error.message);
      return "Sorry, something went wrong.";
    }

    console.error("Unexpected error:", error);
    return "An unexpected error occurred.";
  }
};
