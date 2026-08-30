import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.scss";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const API_URL =
  "https://backend-portfolio-assistent.vercel.app";

export default function PortfolioAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isStarting, setIsStarting] = useState(true);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  // =====================================================
  // INITIAL MESSAGE
  // =====================================================

  const initialMessage: Message = {
    sender: "bot",
    text:
      "👋 Hi! I'm your website assistant. What kind of website are you looking to build?",
  };

  const newChatMessage: Message = {
    sender: "bot",
    text:
      "👋 New chat started! What kind of website are you looking to build?",
  };

  // =====================================================
  // CLEAN UP TYPING INTERVAL
  // =====================================================

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // =====================================================
  // START NEW SESSION WHEN PAGE LOADS / REFRESHES
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const startNewSession = async () => {
      try {
        setIsStarting(true);

        /*
         * IMPORTANT:
         *
         * /reset destroys the existing Express session.
         *
         * It does NOT create a new chat session because
         * saveUninitialized:false is being used on the server.
         *
         * Therefore Redis should NOT receive a new chat
         * session just because the page loaded.
         */

        await axios.post(
          `${API_URL}/reset`,
          {},
          {
            withCredentials: true,
          }
        );

        if (mounted) {
          setMessages([initialMessage]);
          setChatEnded(false);
          setUserInput("");
        }

        console.log("🆕 New chat session ready.");
      } catch (error: any) {
        console.error(
          "❌ Could not initialize chat session:",
          error?.response?.data || error?.message || error
        );

        /*
         * Even if /reset fails, allow the user to see
         * the chat UI.
         */

        if (mounted) {
          setMessages([initialMessage]);
          setChatEnded(false);
        }
      } finally {
        if (mounted) {
          setIsStarting(false);
        }
      }
    };

    startNewSession();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop =
        chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async () => {
    if (isStarting) return;

    if (!userInput.trim()) return;

    if (chatEnded) return;

    const currentInput = userInput.trim();

    const newMessages: Message[] = [
      ...messages,
      {
        sender: "user",
        text: currentInput,
      },
    ];

    setMessages(newMessages);
    setUserInput("");
    setIsTyping(true);

    try {
      console.log("👤 Sending:", currentInput);

      // =================================================
      // SEND TO BACKEND
      // =================================================

      const res = await axios.post(
        `${API_URL}/chat`,
        {
          message: currentInput,
        },
        {
          /*
           * VERY IMPORTANT
           *
           * This allows the browser to send the
           * Express session cookie.
           */

          withCredentials: true,
        }
      );

      const botReply =
        res.data?.reply ||
        "No response received.";

      console.log("🤖 AI:", botReply);

      // =================================================
      // TYPE BOT RESPONSE
      // =================================================

      typeBotMessage(
        botReply,
        newMessages
      );

      // =================================================
      // CHECK IF CHAT IS FINISHED
      // =================================================

      if (
        botReply
          .toLowerCase()
          .includes(
            "-- end of summary --"
          )
      ) {
        setChatEnded(true);

        /*
         * Backend sends the email and destroys
         * the Express session.
         */

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text:
                "✅ Your information has been sent successfully. You can start a new chat anytime.",
            },
          ]);
        }, 1000);
      }
    } catch (error: any) {
      console.error(
        "❌ Chat error:",
        error?.response?.data || error?.message || error
      );

      // =================================================
      // STOP TYPING
      // =================================================

      setIsTyping(false);

      // =================================================
      // USER FRIENDLY ERROR
      // =================================================

      let botMessage =
        "Oops! Something went wrong. Please try again later.";

      // 429
      if (
        error?.response?.status === 429
      ) {
        botMessage =
          "Sorry, our AI service is temporarily busy. Please try again in a few minutes.";
      }

      // 500
      else if (
        error?.response?.status === 500
      ) {
        botMessage =
          "Sorry, the AI assistant is temporarily unavailable. Please try again.";
      }

      // Network error
      else if (
        !error?.response
      ) {
        botMessage =
          "Unable to connect to the server. Please check your internet connection and try again.";
      }

      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: botMessage,
        },
      ]);
    }
  };

  // =====================================================
  // BOT TYPING ANIMATION
  // =====================================================

  const typeBotMessage = (
    text: string,
    previousMessages: Message[]
  ) => {
    // Clear previous interval
    if (typingIntervalRef.current) {
      clearInterval(
        typingIntervalRef.current
      );
    }

    let index = 0;

    setIsTyping(true);

    typingIntervalRef.current =
      setInterval(() => {
        if (index < text.length) {
          setMessages([
            ...previousMessages,
            {
              sender: "bot",
              text:
                text.slice(
                  0,
                  index + 1
                ),
            },
          ]);

          index++;
        } else {
          if (
            typingIntervalRef.current
          ) {
            clearInterval(
              typingIntervalRef.current
            );

            typingIntervalRef.current =
              null;
          }

          setIsTyping(false);
        }
      }, 20);
  };

  // =====================================================
  // RESET CHAT
  // =====================================================

  const resetChat = async () => {
    // Stop typing animation
    if (typingIntervalRef.current) {
      clearInterval(
        typingIntervalRef.current
      );

      typingIntervalRef.current =
        null;
    }

    setIsTyping(false);
    setUserInput("");
    setChatEnded(false);

    try {
      console.log(
        "🗑️ Destroying current server session..."
      );

      // =================================================
      // DESTROY CURRENT REDIS SESSION
      // =================================================

      await axios.post(
        `${API_URL}/reset`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(
        "✅ Old session deleted."
      );

      /*
       * /reset destroys the old Express session.
       *
       * We don't immediately send /chat here.
       *
       * Therefore no new Redis chat session is
       * created until the user sends a message.
       */

      setMessages([
        newChatMessage,
      ]);

      console.log(
        "🆕 Waiting for first message..."
      );
    } catch (error: any) {
      console.error(
        "❌ Reset error:",
        error?.response?.data ||
          error?.message ||
          error
      );

      /*
       * Still reset the UI even if the
       * backend reset request fails.
       */

      setMessages([
        newChatMessage,
      ]);
    }
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    /*
     * Enter = send
     *
     * Shift + Enter = new line
     */

    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.ctrlKey
    ) {
      e.preventDefault();

      sendMessage();
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="chat-container">

      {/* ================================================
          HEADER
      ================================================= */}

      <div className="chat-header">
        💬 AI Portfolio Assistant

        <div className="chat-actions">

          {/* Minimize */}
          <button
            className="toggle-btn"
            type="button"
            onClick={() =>
              setIsMinimized(
                !isMinimized
              )
            }
            aria-label={
              isMinimized
                ? "Open chat"
                : "Minimize chat"
            }
          >
            {isMinimized
              ? "🔼"
              : "🔽"}
          </button>

          {/* Reset */}
          <button
            className="reset-btn"
            type="button"
            onClick={
              resetChat
            }
            aria-label="Start new chat"
          >
            🔄
          </button>

        </div>
      </div>

      {/* ================================================
          CHAT BODY
      ================================================= */}

      {!isMinimized && (
        <>

          <div
            className="chat-box"
            ref={chatBoxRef}
          >

            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender}`}
                >
                  {msg.text}
                </div>
              )
            )}

            {/* Typing */}
            {isTyping && (
              <div className="message bot">
                Typing...
              </div>
            )}

          </div>

          {/* ============================================
              INPUT
          ============================================= */}

          <div className="input-container">

            <textarea
              value={userInput}
              disabled={
                chatEnded ||
                isStarting
              }
              onChange={(e) =>
                setUserInput(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              placeholder={
                isStarting
                  ? "Starting new chat..."
                  : chatEnded
                  ? "Chat completed. Start a new chat to begin again."
                  : "Type your message... (Shift + Enter for new line)"
              }
            />

            <button
              type="button"
              onClick={
                sendMessage
              }
              disabled={
                chatEnded ||
                isStarting ||
                !userInput.trim()
              }
            >
              Send
            </button>

          </div>

        </>
      )}

    </div>
  );
}
