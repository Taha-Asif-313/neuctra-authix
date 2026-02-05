import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error = false,
  success = false,
  helperText = "",
  show,
  toggleShow,
  prefixIcon: PrefixIcon,
  className = "",
}) => {
  const hasPrefixIcon = Boolean(PrefixIcon);

  return (
    <div className="w-full space-y-1">
      {/* Label */}
      {label && (
        <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-200">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Prefix Icon */}
        {hasPrefixIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <PrefixIcon size={18} />
          </div>
        )}

        {/* Password input */}
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full rounded-lg text-sm
            bg-white/5 border text-white placeholder-gray-500
            py-3 pr-10
            transition-all duration-300
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${hasPrefixIcon ? "pl-10" : "px-4"}
            ${error
              ? "border-red-500/50 focus:border-red-500"
              : success
                ? "border-emerald-500/50 focus:border-emerald-500"
                : "border-white/20 focus:border-primary"
            }
            ${className}
          `}
          placeholder="Enter password"
        />

        {/* Show / Hide toggle */}
        <button
          type="button"
          onClick={toggleShow}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Helper / Error text */}
      {helperText && (
        <p
          className={`text-xs ${error
              ? "text-red-400"
              : success
                ? "text-emerald-400"
                : "text-gray-400"
            }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
