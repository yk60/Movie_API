import { createContext, useState } from "react";

export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlists, setWatchlists] = useState([]);
  return (
    <WatchlistContext.Provider value={{ watchlists, setWatchlists }}>
      {children}
    </WatchlistContext.Provider>
  );
}
