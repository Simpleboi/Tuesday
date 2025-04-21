import { useState, useEffect, useRef } from "react";
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
  const [input, setInput] = useState("");
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // 1) Load voices once
  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
      console.log("Loaded voices:", voicesRef.current.map((v) => v.name));
    };
    window.speechSynthesis.onvoiceschanged = load;
    load();
  }, []);

  // 2) speakText uses the cached voices
  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    console.log("→ speakText:", text);
    // Cancel only existing speech
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.75;
    utter.onstart = () => console.log("🔊 TTS started");
    utter.onend   = () => console.log("🔇 TTS ended");
    utter.onerror = (e) => console.error("❗ TTS error:", e);

    // Pick voice from cache
    // const voices = voicesRef.current;
    // utter.voice =
    //   voices.find((v) => v.name === "Google US English") ||
    //   voices.find((v) => v.lang.startsWith("en")) ||
    //   voices[0] ||
    //   null;
    // console.log("Using voice:", utter.voice?.name);

    window.speechSynthesis.speak(utter);
  };

  // 3) sendMessage flow unchanged
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user" as "user", content: input };
    const conv = [...messages, userMessage];
    setMessages(conv);
    setInput("");

    const botText = await getChatResponse(conv);
    setMessages((prev) => [...prev, { role: "assistant", content: botText }]);

    speakText(botText);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages
          .filter((m) => m.role !== "system")
          .map((m, i) => (
            <ChatMessage
              key={i}
              message={m.content}
              isUser={m.role === "user"}
            />
          ))}
      </div>
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}
