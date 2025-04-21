// src/globals.d.ts
export {}; // ensure this file is treated as a module

declare global {
  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
    length: number;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }

  interface SpeechGrammarList {}
  interface SpeechGrammar {}
  interface SpeechRecognition {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    onaudioend: (this: SpeechRecognition, ev: Event) => any;
    onaudiostart: (this: SpeechRecognition, ev: Event) => any;
    onend: (this: SpeechRecognition, ev: Event) => any;
    onerror: (this: SpeechRecognition, ev: any) => any;
    onresult: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
    onstart: (this: SpeechRecognition, ev: Event) => any;
    abort(): void;
    start(): void;
    stop(): void;
  }

  var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
  var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };

  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof webkitSpeechRecognition;
  }
}
