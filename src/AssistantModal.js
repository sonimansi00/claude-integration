import "./AssistantModal.css";

export default function AssistantModal({ onClose, closing }) {
  return (
    <div className={`assistant-overlay ${closing ? "closing" : "opening"}`}>
      <div className="assistant-container">
        
        <header className="assistant-header">
          <h2>Mercedes Assistant</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>

        <div className="chat-body">
          <div className="chat-message assistant">
            Hi! How can I help you today?
          </div>
        </div>

        <div className="chat-input-bar">
          <button className="mic-btn">🎤</button>
          <input placeholder="Ask me anything..." className="chat-input" />
          <button className="send-btn">➤</button>
        </div>
      </div>
    </div>
  );
}
