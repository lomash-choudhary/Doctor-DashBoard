import { useState, useRef, useEffect } from "react";

export default function TimeSlotActionMenu({ onEdit, onDelete, isDisabled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle clicks outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        disabled={isDisabled}
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <i className="fas fa-ellipsis-h text-gray-500"></i>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-1 py-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
          >
            <i className="fas fa-edit mr-2 text-blue-500"></i> Edit
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
          >
            <i className="fas fa-trash-alt mr-2 text-red-500"></i> Delete
          </button>
        </div>
      )}
    </div>
  );
}
