import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://ghibliapi.herokuapp.com/films", (req, res, ctx) => {
    return res(
      ctx.json([
                {
                  "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
                  "title": "Castle in the Sky"
                },
                {
                  "id": "12cfb892-aac0-4c5b-94af-521852e46d6a",
                  "title": "Grave of the Fireflies"
                }
            ])
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());





test('renders Castle in the Sky', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Castle in the Sky/i);
  expect(linkElement).toBeInTheDocument();
});
