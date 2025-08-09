import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders without crashing and shows some text', () => {
  render(<App />);
  // Adjust to match something you know appears in your app
  expect(screen.getByText(/reddit/i)).toBeInTheDocument();
});