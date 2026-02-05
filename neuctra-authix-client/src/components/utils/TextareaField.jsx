const TextareaField = ({
  label,
  name,
  icon: Icon,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = false,
  success = false,
  rows = 3,
  helperText = "",
  className = "",
}) => {
  return (
    <div className="w-full space-y-2">
      {/* Label */}
      {label && (
        <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-200">
          {Icon && <Icon size={18} className="text-primary" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Textarea */}
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`
            w-full px-4 py-2.5 text-sm rounded-lg
            bg-white/5 backdrop-blur-sm
            border text-white placeholder-gray-500 resize-none
            transition-all duration-300
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : success
                ? "border-emerald-500/50 focus:border-emerald-500"
                : "border-white/10 focus:border-primary"
            }
            ${className}
          `}
        />
      </div>

      {/* Helper / Error Text */}
      {helperText && (
        <p
          className={`text-xs ${
            error
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

export default TextareaField;
