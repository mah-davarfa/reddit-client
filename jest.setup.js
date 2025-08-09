import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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
