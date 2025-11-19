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
 *
 * UI Structure:
 * 1. Overlay: Full-screen backdrop with blur effect
 * 2. Container: Centered chat interface with glass morphism styling
 * 3. Header: Title and close button
 * 4. Chat Body: Message display area (currently shows static welcome message)
 * 5. Input Bar: Microphone, text input, and send button
 *
 * Animation:
 * - Uses 'opening' class for zoom-in effect (350ms)
 * - Uses 'closing' class for zoom-out effect (350ms)
 * - Animations defined in AssistantModal.css
 *
 * Current Limitations (noted in CLAUDE.md):
 * - Messages are static (no backend integration yet)
 * - No message sending/receiving logic
 * - Voice input is UI-only (mic button non-functional)
 * - No context integration with viewport text captured by App.js
 * - No message persistence/history
 */
export default function AssistantModal({ onClose, closing }) {
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
            - Currently shows single static welcome message
            - Future: Will display message history with user/assistant messages
            - Should integrate with viewport text context from App.js */}
        <div className="chat-body">
          <div className="chat-message assistant">
            Hi! How can I help you today?
          </div>
        </div>

        {/* Input bar for user interaction
            - Contains: microphone button, text input, send button
            - Currently UI-only (no functional message sending yet) */}
        <div className="chat-input-bar">
          {/* Microphone button for voice input (not yet functional) */}
          <button className="mic-btn">🎤</button>

          {/* Text input for user messages */}
          <input placeholder="Ask me anything..." className="chat-input" />

          {/* Send button to submit messages (not yet functional) */}
          <button className="send-btn">➤</button>
        </div>
      </div>
    </div>
  );
}
