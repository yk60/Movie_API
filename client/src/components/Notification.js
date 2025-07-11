import React, { useEffect } from "react";

function Notification({ message, duration = 500, onDone }) {
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
    <div className="notification">
      <p>{message}</p>
    </div>
  );
}

export default Notification;
