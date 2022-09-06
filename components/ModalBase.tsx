import React, { useEffect, useState } from "react";

interface ModalBaseProps {
  active: boolean;
  closeEvent?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

export default function ModalBase({
  active = false,
  closeEvent,
  children,
}: ModalBaseProps) {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = active ? "hidden" : "initial";

    let timeoutId: any;
    if (active) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "initial";
    };
  }, []);

  if (!active && closed) return null;

  return (
    <>
      <div className={"modal-base-container " + (!!active ? "active" : "")}>
        <div className="modal-back" onClick={closeEvent}></div>
        <div className="modal-content">{children}</div>
      </div>
      <style jsx>{`
        .modal-base-container {
          display: flex;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
        }
        .modal-back {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          opacity: 0.5;
          background-color: var(--gray-scale-black);;
        }
        .modal-content {
          position: relative;
          z-index: 10;
          background-color: #fff;
          border-radius: 15px;
          overflow: hidden;
          animation: popInFromBottom 0.4s;
          animation: popOutToBottom 0.4s;
        }
        @keyframes popInFromBottom {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }
        @keyframes popOutToBottom {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
