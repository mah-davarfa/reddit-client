// src/test/App.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

//  mock axios so initial effects don't hit the network
import axios from 'axios';
jest.mock('axios');
beforeEach(() => {
  axios.get.mockResolvedValue({ data: { data: { children: [] } } });
});

test('renders without crashing and shows some text from child component', () => {
  render(
    <Provider store={store}>
      <App /> 
    </Provider>
  );

  // Assertion comes from VoiceSearchBar rendered through AppLayout
  expect(
    screen.getByText(/search reddit by voice or text/i)
  ).toBeInTheDocument();
});
