import { useState } from "react";
import { ChatMessage } from "./chatMessage";
import { ChatInput } from "./chatInput";
import { getChatResponse } from "../utils/chatService";
import "../styles/chat.scss";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as "user", content: input };

    // Create a new messages array with the user message
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput(""); // Clear input after sending the message

    // Get the bot response using the new messages array
    const botResponse = await getChatResponse(newMessages);
    const botMessage = {
      role: "assistant" as "assistant",
      content: botResponse,
    };

    // Append the bot response to the messages
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.content}
              isUser={msg.role === "user"}
            />
          ))}
      </div>
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}
