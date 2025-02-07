import { X } from "lucide-react";
import React from "react";

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title = "Modal Title",
  isHeader = true,
  isFooter = true,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed text-secondary inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {/* Header */}

        {isHeader && (
          <div className="flex justify-between border-b pb-3 items-center space-x-5">
            <h2 className="text-lg md:text-xl lg:text-3xl font-bold">
              {title}
            </h2>
            <button onClick={onClose} className="text-secondary">
              <X size={30} strokeWidth={3} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="mt-4">{children}</div>

        {/* Footer */}

        {isFooter && (
          <div className="flex justify-end gap-2 pt-3 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80"
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
