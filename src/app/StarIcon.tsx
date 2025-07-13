import React from "react";

interface StarIconProps {
  filled?: boolean;
  size?: number;
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ filled = false, size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: filled ? "drop-shadow(0 0 6px #FFD70088)" : undefined }}
  >
    <defs>
      <linearGradient id="star-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFB300" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.5l2.92 6.13 6.73.58c.6.05.85.8.38 1.2l-5.18 4.45 1.62 6.56c.15.6-.5 1.08-1.02.75L12 18.02l-5.45 3.65c-.52.33-1.17-.15-1.02-.75l1.62-6.56-5.18-4.45c-.47-.4-.22-1.15.38-1.2l6.73-.58L12 2.5z"
      fill={filled ? "url(#star-gradient)" : "#222"}
      stroke="#FFD700"
      strokeWidth="1.2"
    />
  </svg>
);

export default StarIcon; 