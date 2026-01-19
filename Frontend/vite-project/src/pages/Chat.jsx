import { useState, useEffect } from "react";
import { socket } from "../context/SocketContext";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    const data = { text: message, receiverId: "RECEIVER_USER_ID" };
    socket.emit("sendMessage", data);
    setMessages(prev => [...prev, data]);
    setMessage("");
  };

  return (
    <div>
      <div>{messages.map((m, i) => <div key={i}>{m.text}</div>)}</div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
