import { useState } from "react";
import api from "../lib/api";

export default function SendMessage({ ownerEmail }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/messages/sendEmail", {
        to: ownerEmail, 
        subject,
        message,
      });

      if (res.data.success) {
        setStatus("✅ Email sent successfully!");
      }
    } catch (err) {
      setStatus("❌ Failed to send email");
    }
  };

  return (
    <div>
      <h2>Send Message to Owner</h2>
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send Message</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
