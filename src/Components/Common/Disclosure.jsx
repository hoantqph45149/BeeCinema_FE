import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const Disclosure = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <button
        className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-medium">{title}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="max-h-full p-3 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Disclosure;
