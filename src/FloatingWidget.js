import "./FloatingWidget.css";

/**
 * FloatingWidget Component
 *
 * A persistent floating visual indicator that appears in the bottom-right corner
 * of the page (z-index: 5000). Displays a speech bubble with contextual message
 * and an animated orb.
 *
 * Architecture:
 * - Pure presentational component with no interactive functionality
 * - Renders a floating bubble with contextual message and animated orb
 * - No state management required
 */
export default function FloatingWidget() {
  return (
    <>
      {/* Floating bubble + orb wrapper
          - Fixed position in bottom-right corner (via CSS)
          - Contains contextual help text and animated orb indicator */}
      <div className="assistant-floating-wrapper">
        {/* Speech bubble with context-aware message
            - Currently shows static text about "range"
            - Future: Could dynamically update based on viewport content tracked by App.js */}
        <div className="assistant-bubble">
          It looks like you want to learn more about range? Can I help?
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
    </>
  );
}
