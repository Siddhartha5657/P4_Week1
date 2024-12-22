import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [sizeCategory, setSizeCategory] = useState(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const refreshChat = () => {
    setMessages([{ from: "bot", text: "Hello! How can I assist you today?" }]);
    setSizeCategory(null);
  };

  const handleCategorySelection = (category) => {
    setMessages([
      ...messages,
      { from: "user", text: `Show me ${category} products` },
      { from: "bot", text: `Here are some ${category} products for you!` },
    ]);
    setSizeCategory(null); // Clear size chart on category selection
  };

  const handleSizeButtonClick = (category) => {
    setSizeCategory(category);
    const sizeChart = {
      men: {
        S: "Chest: 34-36 inches, Waist: 28-30 inches",
        M: "Chest: 38-40 inches, Waist: 32-34 inches",
        L: "Chest: 42-44 inches, Waist: 36-38 inches",
        XL: "Chest: 46-48 inches, Waist: 40-42 inches",
      },
      women: {
        S: "Bust: 32-34 inches, Waist: 24-26 inches",
        M: "Bust: 36-38 inches, Waist: 28-30 inches",
        L: "Bust: 40-42 inches, Waist: 32-34 inches",
        XL: "Bust: 44-46 inches, Waist: 36-38 inches",
      },
      children: {
        S: "Height: 40-44 inches, Weight: 35-40 lbs",
        M: "Height: 45-50 inches, Weight: 41-50 lbs",
        L: "Height: 51-56 inches, Weight: 51-60 lbs",
        XL: "Height: 57-62 inches, Weight: 61-70 lbs",
      },
    };

    setMessages([
      ...messages,
      { from: "user", text: `Show me the size chart for ${category}` },
      {
        from: "bot",
        text: `Here is the size chart for ${category}:
        ${Object.entries(sizeChart[category])
          .map(([size, details]) => `${size}: ${details}`)
          .join("\n")}`,
      },
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    if (message) {
      setMessages([
        ...messages,
        { from: "user", text: message },
        { from: "bot", text: "Thank you for your message! How can I assist you further?" },
      ]);
      e.target.elements.message.value = "";
    }
  };

  return (
    <div>
      {/* Chatbot Floating Button */}
      <div className="chatbot-btn" onClick={toggleChat}>
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <div>
              <button className="chatbot-refresh-btn" onClick={refreshChat}>
                ↺ Refresh
              </button>
              <button onClick={toggleChat}>X</button>
            </div>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={message.from}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chatbot-options">
            <p>Select a category to browse:</p>
            <button onClick={() => handleCategorySelection("women")}>Women</button>
            <button onClick={() => handleCategorySelection("men")}>Men</button>
            <button onClick={() => handleCategorySelection("children")}>Children</button>
            <button onClick={() => handleSizeButtonClick(sizeCategory || "men")}>Size</button>
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
