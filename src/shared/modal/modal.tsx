import React, { useEffect } from "react";
import "./modal.scss";
import IconButton from "../icon-button/icon-button";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  slideInDirection?: "left" | "right" | "top" | "bottom";
  slideOutDirection?: "left" | "right" | "top" | "bottom";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  slideInDirection = "bottom",
  slideOutDirection = "bottom",
}: ModalProps) {
  const [triggerSlideOut, setTriggerSlideOut] = React.useState(false);
  /*  useEffect(() => {
    if (isOpen) setTriggerSlideOut(false);
  }, [isOpen]); */

  if (!isOpen) return null;

  const handleClose = () => {
    setTriggerSlideOut(true);
    setTimeout(() => {
      onClose();
      setTriggerSlideOut(false);
    }, 200);
  };
  return (
    <div
      className={` modal-overlay ${triggerSlideOut ? "fade-out" : "fade-in"}`}
    >
      <div
        className={`modal  ${
          triggerSlideOut
            ? "slide-out-to-" + slideOutDirection
            : "slide-in-from-" + slideInDirection
        }`}
      >
        <div className="modal-header">
          <IconButton
            elevation={false}
            ripple={true}
            icon={<CloseIcon />}
            onClick={handleClose}
          ></IconButton>
        </div>
        <div className="modal-content">{children}</div>
      </div>
      <div className={`modal-backdrop`} onClick={() => handleClose()}></div>
    </div>
  );
}
