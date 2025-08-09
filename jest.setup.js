import '@testing-library/jest-dom';
class MockSpeechRecognition {
  constructor() {
    this.lang = 'en-US';
    this.interimResults = false;
    this.onresult = () => {};
    this.onerror = () => {};
    this.onend = () => {};
  }
  start() {}
  stop() {}
}

Object.defineProperty(window, 'SpeechRecognition', { value: MockSpeechRecognition });
Object.defineProperty(window, 'webkitSpeechRecognition', { value: MockSpeechRecognition });
