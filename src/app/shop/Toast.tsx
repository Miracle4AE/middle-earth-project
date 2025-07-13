import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose, duration = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-8 right-8 z-[9999] px-6 py-4 rounded-2xl shadow-2xl border-2 flex items-center gap-3 animate-fade-in-up
        ${type === "success"
          ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 border-yellow-600 text-black"
          : "bg-gradient-to-r from-red-600 via-red-500 to-yellow-300 border-red-700 text-black"}
      `}
      style={{ fontFamily: 'Ringbearer, serif', minWidth: 220, fontSize: 18 }}
    >
      {type === "success" ? (
        <span className="text-2xl">✔️</span>
      ) : (
        <span className="text-2xl">❌</span>
      )}
      <span className="font-bold drop-shadow-[0_0_10px_gold]">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold px-2 rounded hover:bg-black/10 transition"
        aria-label="Kapat"
      >
        ×
      </button>
    </div>
  );
};

export default Toast; 