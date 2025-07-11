import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
);

reportWebVitals();
