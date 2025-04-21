import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

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
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recog.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recog;
  }, [setInput]);

  const toggleListening = () => {
    const recog = recognitionRef.current;
    if (!recog) {
      alert("SpeechRecognition not supported in this browser");
      return;
    }

    if (listening) {
      recog.stop();
    } else {
      recog.start();
      setListening(true);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      // If we're currently listening, stop first
      if (listening && recognitionRef.current) {
        recognitionRef.current.stop();
        setListening(false);
      }
      // Then send the message
      sendMessage();
    }
  };

  return (
    <div className="input-container">
      <button
        className="mic-button"
        onClick={toggleListening}
        aria-label={listening ? "Stop listening" : "Start listening"}
      >
        {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="How can I help you?"
        onKeyDown={handleKeyDown}
      />

      <button onClick={sendMessage}>
        <FaPaperPlane />
      </button>
    </div>
  );
};
