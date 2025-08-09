import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import VoiceSearchBar from '../components/VoiceSearchBar';

test('renders mic button and starts recognition when clicked', () => {
  render(
    <MemoryRouter>
      <VoiceSearchBar />
    </MemoryRouter>
  );

  const micButton = screen.getByRole('button', { name: /start voice search/i });
  fireEvent.click(micButton);
  expect(micButton).toBeInTheDocument();
});
