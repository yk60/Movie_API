// Frontend testing
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Mock fetch so each component doesn't make real HTTP requests
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]), // returns an empty array for movies
    })
  );
});

// Clean up the fetch mock after each test
afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

// Test for presence of elements:
test("renders correctly", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const element = await screen.findByText(/Welcome to Movies API/i);
  expect(element).toBeInTheDocument();
});

test("renders without crashing", () => {
  render(
    <BrowserRouter>
      <div>Test</div>
    </BrowserRouter>
  );
});
