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

test('should return a 500 ststus from call', async () => {
  server.use(
      rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
        // Respond with "500 Internal Server Error" status for this test.
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal Server Error' }),
        )
      }),
  )
  render(<App />);
  const linkElement = await screen.findByText(/Oops… something went wrong, try again 🤕/i);
  expect(linkElement).toBeInTheDocument();
});


test('should return a 418 ststus from call', async () => {
  server.use(
      rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
        // Respond with "500 Internal Server Error" status for this test.
        return res(
          ctx.status(418),
          ctx.json({ message: "I'm a teapot" }),
        )
      }),
  )
  render(<App />);
  const linkElement = await screen.findByText(/418 I'm a tea pot 🫖, silly/i);
  expect(linkElement).toBeInTheDocument();
});