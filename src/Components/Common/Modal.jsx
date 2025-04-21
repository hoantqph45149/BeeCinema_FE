import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title = "Modal Title",
  isHeader = true,
  isFooter = true,
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Modal Container */}
      <div
        className={`bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 max-h-screen overflow-y-auto max-w-[95%] xl:w-1/2${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        {isHeader && (
          <div className="flex justify-between gap-4 md:gap-16 border-b pb-3 items-center">
            <h2 className="text-sm md:text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={30} strokeWidth={3} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {isFooter && (
          <div className="flex justify-end gap-2 pt-3 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Close
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
