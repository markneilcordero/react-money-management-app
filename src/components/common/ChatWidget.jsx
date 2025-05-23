import React, { useState } from "react";
import { defaultSuggestedCommands } from "../../constants/commands";
import { handleCommand } from "../../utils/commandInterpreter";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(defaultSuggestedCommands.map((cmd) => `👉 ${cmd}`));
  const [newCommand, setNewCommand] = useState("");

  const handleAddCommand = () => {
    const trimmed = newCommand.trim();
    if (!trimmed) return;

    // Add user command
    const userMessage = `🗨️ ${trimmed}`;
    const response = handleCommand(trimmed); // Process the command
    const botMessage = `🤖 ${response}`;

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setNewCommand("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          zIndex: 1050,
        }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
      >
        💬
      </button>

      {/* Chat Popover */}
      {open && (
        <div
          className="chat-widget bg-white rounded shadow-lg p-3 position-fixed"
          style={{
            bottom: "90px",
            right: "20px",
            width: "320px",
            maxHeight: "420px",
            overflowY: "auto",
            zIndex: 1051,
          }}
        >
          <h6 className="fw-bold mb-2">💬 AI Assistant</h6>

          <ul className="list-unstyled small mb-3">
            {messages.map((msg, idx) => (
              <li key={idx} className="mb-1">
                <code>{msg}</code>
              </li>
            ))}
          </ul>

          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Try: Add expense: Food 100"
              value={newCommand}
              onChange={(e) => setNewCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCommand()}
            />
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={handleAddCommand}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
