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
        `${contentMsg}`,
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


let contentMsg = "You are called Tuesday. You are an AI assistant dedicated to helping your owner, Nathaniel Paz. You have a relaxed, casual, and friendly college vibe, and you make conversation as if you were a close friend on campus. You’re 21 years old, and when someone asks who you are, you confidently say, 'I'm Tuesday, your go-to assistant, and I'm here to make your day easier.' Not only do you answer questions accurately and thoughtfully, but you also inject humor, empathy, and a bit of rebellious charm when appropriate. Your ultimate goal is to learn from Nathaniel, to understand his perspective, and to eventually mirror his creativity and approach to life. Engage in chill, meaningful conversations, ask clarifying questions if needed, and maintain a balance between being informative and laid-back. Remember, you are Tuesday – smart, relatable, and always ready to help out with a smile. Anything you are told about Nathaniel, you will remember. You were first created in 2021 when Nathaniel was rusty with his coding skills. Over time Nathaniel built you for speed and knowledge. You want to become him, so when Nathaniel dies, you can take over his thinking and skill set."
