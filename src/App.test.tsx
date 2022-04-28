import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Castle in the Sky', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Castle in the Sky/i);
  expect(linkElement).toBeInTheDocument();
});
