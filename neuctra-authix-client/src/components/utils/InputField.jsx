const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  icon: Icon,
  prefix,
  prefixIcon: PrefixIcon,
  value,
  onChange,
  disabled = false,
  error = false,
  success = false,
  helperText = "",
  className = "",
}) => {
  const hasPrefixIcon = Boolean(PrefixIcon);
  const hasPrefixText = Boolean(prefix);
  const hasPrefix = hasPrefixIcon || hasPrefixText;

  return (
    <div className="w-full space-y-1">
      {/* Label */}
      {label && (
        <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-200">
          {Icon && <Icon size={18} className="text-primary" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        {/* Prefix */}
        {hasPrefix && (
          <div className="absolute inset-y-0 left-0.5 flex items-center px-3 gap-2 text-sm text-gray-400 pointer-events-none">
            {PrefixIcon && <PrefixIcon size={18} />}

            {hasPrefixText && (
              <>
                <span>{prefix}</span>
                <span className="h-4 w-px bg-white/10" />
              </>
            )}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full rounded-lg text-sm
            bg-white/5 border text-white placeholder-gray-500
            py-3
            transition-all duration-300
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              hasPrefixText
                ? "pl-16 pr-4"
                : hasPrefixIcon
                ? "pl-10 pr-4"
                : "px-4"
            }
            ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : success
                ? "border-emerald-500/50 focus:border-emerald-500"
                : "border-white/20 focus:border-primary"
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

export default InputField;
