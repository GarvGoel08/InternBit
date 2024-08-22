"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendMessage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setStatus("Message sent successfully!");
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center text-black p-4">
      <h1 className="text-2xl font-bold mb-6">Send a Slack Message</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`w-full ${loading?"bg-gray-300 cursor-not-allowed":"hover:bg-blue-600"} bg-blue-500 text-white p-3 rounded-md  transition duration-300`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
}
