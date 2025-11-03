import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.scss";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function PortfolioAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  // ✅ Auto-start message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi! I'm your website assistant. What kind of website are you looking to build?",
      },
    ]);
  }, []);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim() || chatEnded) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: userInput },
    ];
    setMessages(newMessages);
    const currentInput = userInput;
    setUserInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(
  "https://backend-portfolio-assistent.vercel.app/chat",
  { message: currentInput },
  { withCredentials: true } // 👈 keeps user session unique
);

      const botReply = res.data.reply || "No response received.";
      typeBotMessage(botReply, newMessages);

      // ✅ End chat if email sent
      if (botReply.toLowerCase().includes("-- end of summary --")) {
        setChatEnded(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "✅ Your information has been sent successfully. You can start a new chat anytime.",
            },
          ]);
        }, 1000);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Server error, please try again later." },
      ]);
      setIsTyping(false);
    }
  };

  // ✅ Typing animation
  const typeBotMessage = (text: string, prevMessages: Message[]) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setMessages([
          ...prevMessages,
          { sender: "bot", text: text.slice(0, index + 1) },
        ]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);
  };

  // ✅ Reset chat
  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 New chat started! What kind of website are you looking to build?",
      },
    ]);
    setUserInput("");
    setChatEnded(false);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        💬 Portfolio Assistant
        <div className="chat-actions">
          <button className="toggle-btn" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? "🔼" : "🔽"}
          </button>
          <button className="reset-btn" onClick={resetChat}>
            🔄
          </button>
        </div>
      </div>

      {/* Chat body (hidden when minimized) */}
      {!isMinimized && (
        <>
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div className="message bot">Typing...</div>}
          </div>

          <div className="input-container">
            <textarea
              value={userInput}
              disabled={chatEnded}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                chatEnded
                  ? "Chat completed. Start a new chat to begin again."
                  : "Type your message... (Shift + Enter for new line)"
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage} disabled={chatEnded}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
