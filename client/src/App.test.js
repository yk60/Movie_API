import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]), // mock empty movies array
    })
  );
});

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

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
