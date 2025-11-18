import { useState } from "react";
import AssistantModal from "./AssistantModal";
import "./FloatingWidget.css";

export default function FloatingWidget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setClosing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 350); // match CSS animation time
  };

  return (
    <>
      {/* Floating bubble + orb */}
      <div className="assistant-floating-wrapper" onClick={handleOpen}>
        <div className="assistant-bubble">
          It looks like you want to learn more about range? Can I help?
        </div>

        <div className="assistant-orb">
          <div className="glow-ring">
            <div className="inner-dot" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <AssistantModal
          onClose={handleClose}
          closing={closing}
        />
      )}
    </>
  );
}
