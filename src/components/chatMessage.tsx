import React from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
}) => {
  return <div className={isUser ? "user-msg" : "bot-msg"}>{message}</div>;
};
