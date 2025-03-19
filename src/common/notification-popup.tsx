import "../styles/notification.css";

import { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type} slide-in`}>
      {type === "success" && <span className="icon">✓</span>}
      {type === "error" && <span className="icon">⚠</span>}
      {type === "info" && <span className="icon">ℹ️</span>}
      <p>{message}</p>
    </div>
  );
};

export default Notification;
