import React, { useEffect } from "react";

function Popup({ message, duration = 2000, onDone }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDone();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onDone]);

  if (!message) return null;

  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
}

export default Popup;
