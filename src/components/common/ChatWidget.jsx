// src/components/common/ChatWidget.jsx
import React, { useState } from "react";
import { suggestedCommands } from "../../constants/commands";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

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
            width: "300px",
            maxHeight: "350px",
            overflowY: "auto",
            zIndex: 1051,
          }}
        >
          <h6 className="fw-bold mb-2">💡 Suggested Commands</h6>
          <ul className="list-unstyled small">
            {suggestedCommands.map((cmd, idx) => (
              <li key={idx} className="mb-1">
                👉 <code>{cmd}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
