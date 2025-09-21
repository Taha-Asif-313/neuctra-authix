import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({ label, options, value, onChange, required }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-sm" ref={ref}>
      {label && (
        <label className="block text-xs font-medium text-gray-300 mb-2">
          {label} {required && "*"}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-950 border border-gray-600 rounded-lg text-left text-white flex justify-between items-center focus:ring-2 focus:ring-primary"
      >
        {value || "Select..."}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-zinc-900 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-zinc-800 flex items-center justify-between ${
                value === opt ? "bg-primary/20" : ""
              }`}
            >
              <span>{opt}</span>
              {value === opt && <Check size={14} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
