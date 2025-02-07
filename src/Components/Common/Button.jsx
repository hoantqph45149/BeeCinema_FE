import React from "react";
import { FaTicketAlt } from "react-icons/fa";

const sizeClasses = {
  sm: "text-xs py-1 px-2 text-sm",
  md: "text-sm py-2 px-4 text-base",
  lg: "text-md py-3 px-6 text-lg",
  xl: "text-lg py-4 px-8 text-xl",
};

const Button = ({
  onClick,
  children,
  className = "",
  showIcon = false,
  size = "md",
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full bg-gradient-to-r from-[#0a64a7] via-[#258dcf] to-[#3db1f3] bg-[length:200%_auto] text-white font-bold font-oswald rounded-md hover:opacity-90 transition  ${sizeClasses[size]} ${className}`}
    >
      {showIcon && (
        <span className=" absolute top-1/2 left-2 transform -translate-y-1/2 -rotate-45 opacity-50">
          <FaTicketAlt className="w-12 h-12" />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
