import { useState, useRef, useEffect } from "react";
import QwenChatService from "./QwenChatService";
import "./AssistantModal.css";

/**
 * AssistantModal Component
 *
 * Full-screen modal overlay for the Mercedes AI chat assistant interface.
 * Displays when the FloatingWidget is opened, covering the entire viewport
 * with a dark backdrop (z-index: 9000).
 *
 * Props:
 * - `onClose`: Callback function to close the modal (triggers closing animation)
 * - `closing`: Boolean indicating if the modal is in closing animation state
 * - `contextText`: Text content visible to the user for context-aware responses
 *
 * UI Structure:
 * 1. Overlay: Full-screen backdrop with blur effect
 * 2. Container: Centered chat interface with glass morphism styling
 * 3. Header: Title and close button
 * 4. Chat Body: Message display area with scrollable history
 * 5. Input Bar: Microphone, text input, and send button
 *
 * Features:
 * - Functional message sending/receiving
 * - Context-aware responses from Qwen AI
 * - Real-time message history
 * - Loading indicators for AI responses
 * - Voice input simulation
 *
 * Animation:
 * - Uses 'opening' class for zoom-in effect (350ms)
 * - Uses 'closing' class for zoom-out effect (350ms)
 * - Animations defined in AssistantModal.css
 */
export default function AssistantModal({ onClose, closing, contextText = "" }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", sender: "assistant" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Update context when contextText changes
  useEffect(() => {
    QwenChatService.setContext(contextText);
  }, [contextText]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    // Add user message to history
    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      sender: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Get response from Qwen service with context
      const response = await QwenChatService.sendMessage(inputText.trim(), contextText);

      // Add assistant response to history
      const assistantMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "assistant"
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting response from Qwen:", error);

      // Add error message to history
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: "assistant"
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    // In a real implementation, this would start speech recognition
    alert("Voice input functionality would be implemented here. In a real application, this would capture your voice and convert it to text.");
  };

  return (
    // Full-screen overlay with conditional animation class
    // - 'opening': Applied when modal first mounts (zoom-in animation)
    // - 'closing': Applied when user clicks close (zoom-out animation)
    <div className={`assistant-overlay ${closing ? "closing" : "opening"}`}>
      {/* Main chat interface container
          - Centered on screen with glass morphism effect
          - Contains header, chat body, and input bar */}
      <div className="assistant-container">

        {/* Header bar with title and close button */}
        <header className="assistant-header">
          <h2>Mercedes Assistant</h2>
          {/* Close button triggers onClose callback from FloatingWidget
              which initiates the two-phase closing animation */}
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>

        {/* Chat message display area
            - Displays message history with user and assistant messages
            - Scrollable container for long conversations
            - Automatically scrolls to latest message */}
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message assistant">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {/* Input bar for user interaction
            - Contains: microphone button, text input, send button
            - Fully functional with message sending capability */}
        <div className="chat-input-bar">
          {/* Microphone button for voice input */}
          <button className="mic-btn" onClick={handleMicClick} title="Voice input">
            🎤
          </button>

          {/* Text input for user messages */}
          <input
            placeholder="Ask me anything about Mercedes-Benz..."
            className="chat-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />

          {/* Send button to submit messages */}
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? "..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
}
