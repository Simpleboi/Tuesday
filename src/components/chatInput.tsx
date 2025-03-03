import { FaPaperPlane } from "react-icons/fa";
import React from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  sendMessage,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="How can I help you?"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>
        <FaPaperPlane />
      </button>
    </div>
  );
};
