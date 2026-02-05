import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const SelectField = ({
  label,
  name,
  icon: Icon,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error = false,
  success = false,
  placeholder = "Select an option",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option) => {
    onChange({
      target: { name, value: option.value },
    });
    setOpen(false);
  };

  return (
    <div className="w-full space-y-2" ref={ref}>
      {label && (
        <label className="text-zinc-300 font-medium text-[13px] flex items-center gap-2">
          {Icon && <Icon size={18} className="text-primary/80" />}
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative group">
        {/* Left Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Icon
              size={18}
              className={`transition-colors ${
                error
                  ? "text-rose-500"
                  : success
                  ? "text-emerald-500"
                  : "text-zinc-500 group-focus-within:text-primary"
              }`}
            />
          </div>
        )}

        {/* Trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((p) => !p)}
          className={`
            w-full py-2.5 rounded-lg text-left text-sm
            bg-white/5 backdrop-blur-sm
            border text-white
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? "pl-12 pr-10" : "px-4"}
            ${
              error
                ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20"
                : success
                ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/20"
                : "border-zinc-800 focus:border-primary focus:ring-primary/20"
            }
            ${className}
          `}
        >
          <span className={selectedOption ? "text-white" : "text-zinc-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          {/* Arrow */}
          <ChevronDown
            size={18}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform ${
              open ? "rotate-180" : ""
            } text-zinc-400`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-zinc-800 bg-black shadow-xl overflow-hidden">
            <ul className="max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className={`
                    px-4 py-3 cursor-pointer text-sm
                    transition-colors
                    ${
                      value === opt.value
                        ? "bg-primary/15 text-primary"
                        : "text-zinc-300 hover:bg-zinc-800"
                    }
                  `}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
