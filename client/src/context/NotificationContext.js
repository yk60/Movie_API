import { createContext, useState } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [popupMsg, setPopupMsg] = useState("");
  return (
    <NotificationContext.Provider value={{ popupMsg, setPopupMsg }}>
      {children}
    </NotificationContext.Provider>
  );
}
