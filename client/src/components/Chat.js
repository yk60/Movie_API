import { useState } from "react";

function Chat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmit = () => {};
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSubmit}>Send</button>

      <div>{response}</div>
    </div>
  );
}
export default Chat;
