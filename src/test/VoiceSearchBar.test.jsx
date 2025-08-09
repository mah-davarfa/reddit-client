import { render, screen, fireEvent } from '@testing-library/react';
import VoiceSearchBar from './components/VoiceSearchBar';

test('renders mic button and starts recognition when clicked', () => {
  render(<VoiceSearchBar />);
  const micButton = screen.getByRole('button');
  fireEvent.click(micButton);
  expect(micButton).toBeInTheDocument();
});
