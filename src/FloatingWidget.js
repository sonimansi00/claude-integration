import { useState } from "react";
import AssistantModal from "./AssistantModal";
import "./FloatingWidget.css";

/**
 * FloatingWidget Component
 *
 * A persistent floating chat assistant widget that appears in the bottom-right corner
 * of the page (z-index: 5000). Provides users with context-aware help based on what
 * content they're viewing on the Mercedes landing page.
 *
 * Architecture:
 * - Self-contained component with its own state management
 * - Implements a two-phase animation system for smooth modal transitions
 * - Renders a floating bubble with contextual message and animated orb
 * - Conditionally renders the AssistantModal when opened
 *
 * State Management:
 * - `open`: Boolean controlling modal visibility
 * - `closing`: Boolean managing the closing animation phase
 *
 * Animation Flow:
 * Opening: setClosing(false) → setOpen(true) → triggers 'zoomOpen' animation (350ms)
 * Closing: setClosing(true) → wait 350ms → setOpen(false) + setClosing(false)
 */
export default function FloatingWidget({ contextText = "" }) {
  // State: Controls whether the assistant modal is currently visible
  const [open, setOpen] = useState(false);

  // State: Tracks the closing animation phase to prevent abrupt unmounting
  // This allows the 'zoomClose' animation to complete before removing the modal from DOM
  const [closing, setClosing] = useState(false);

  /**
   * handleOpen
   *
   * Opens the assistant modal with a smooth zoom-in animation.
   *
   * Process:
   * 1. Reset closing state to false (in case modal was previously closing)
   * 2. Set open to true, triggering modal render with 'opening' class
   * 3. CSS 'zoomOpen' animation plays automatically (350ms duration)
   */
  const handleOpen = () => {
    setClosing(false);
    setOpen(true);
  };

  /**
   * handleClose
   *
   * Closes the assistant modal with a smooth zoom-out animation.
   * Uses a two-phase approach to ensure animation completes before unmounting.
   *
   * Process:
   * 1. Set closing to true, triggering 'closing' class on modal
   * 2. CSS 'zoomClose' animation begins (350ms duration)
   * 3. After 350ms timeout, set open to false (unmounts modal)
   * 4. Reset closing to false for next interaction
   *
   * Note: The 350ms timeout matches the CSS animation duration defined in
   * FloatingWidget.css and AssistantModal.css
   */
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 350); // match CSS animation time
  };

  // Generate contextual message based on visible text
  const generateContextualMessage = () => {
    if (!contextText) {
      return "Need help with Mercedes-Benz? Ask me anything!";
    }

    const lowerContext = contextText.toLowerCase();

    if (lowerContext.includes('electric') || lowerContext.includes('eqs') || lowerContext.includes('battery')) {
      return "It looks like you want to learn more about electric vehicles? Can I help?";
    } else if (lowerContext.includes('amg') || lowerContext.includes('performance') || lowerContext.includes('engine')) {
      return "It looks like you want to learn more about performance? Can I help?";
    } else if (lowerContext.includes('luxury') || lowerContext.includes('interior') || lowerContext.includes('leather')) {
      return "It looks like you want to learn more about luxury features? Can I help?";
    } else if (lowerContext.includes('safety') || lowerContext.includes('assist')) {
      return "It looks like you want to learn more about safety features? Can I help?";
    } else if (lowerContext.includes('price') || lowerContext.includes('cost') || lowerContext.includes('finance')) {
      return "It looks like you want to learn more about pricing? Can I help?";
    } else {
      return "Need help with Mercedes-Benz? Ask me anything!";
    }
  };

  return (
    <>
      {/* Floating bubble + orb wrapper
          - Fixed position in bottom-right corner (via CSS)
          - Clicking anywhere on this wrapper opens the assistant modal
          - Contains contextual help text and animated orb indicator */}
      <div className="assistant-floating-wrapper" onClick={handleOpen}>
        {/* Speech bubble with context-aware message
            - Shows dynamic text based on visible content on the page
            - Updated based on viewport content tracked by App.js */}
        <div className="assistant-bubble">
          {generateContextualMessage()}
        </div>

        {/* Animated orb with glow effect
            - Visual indicator of the assistant's presence
            - Consists of: outer glow ring + inner pulsing dot
            - Animations defined in FloatingWidget.css */}
        <div className="assistant-orb">
          <div className="glow-ring">
            <div className="inner-dot" />
          </div>
        </div>
      </div>

      {/* Conditionally render the full-screen assistant modal
          - Only mounts when open === true
          - Receives onClose callback for user-initiated closing
          - Receives closing state to trigger exit animation
          - Receives contextText for context-aware responses
          - Modal overlay covers entire viewport (z-index: 9000) */}
      {open && (
        <AssistantModal
          onClose={handleClose}
          closing={closing}
          contextText={contextText}
        />
      )}
    </>
  );
}
