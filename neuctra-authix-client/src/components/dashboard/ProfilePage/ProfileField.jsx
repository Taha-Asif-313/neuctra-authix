import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";

const ProfileField = ({
  icon,
  label,
  value,
  editable,
  name,
  onChange,
  type = "text",
  placeholder,
  isCopyable,
  isSecret = false,
  onToggleSecret,
  onRegenerate,
  regenerating = false,
  fullWidth = false,
}) => {
  // ✅ Universal copy handler (with fallback)
  const handleCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast.success(`${label} copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "md:col-span-2" : ""}`}>
      {/* Label */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
        {icon}
        <span>{label}</span>
      </div>

      {/* Field container */}
      <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5">
        {editable && name ? (
          // Editable input
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500 px-1"
          />
        ) : isSecret ? (
          // Secret preview
          <span className="flex-1 text-white font-mono text-sm select-none">
            ••••••••••
          </span>
        ) : (
          // Normal preview
          <span className="flex-1 text-white text-sm truncate" title={value}>
            {value || "—"}
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 ml-2">
          {/* Copy */}
          {isCopyable && value && !editable && (
            <button
              onClick={handleCopy}
              className="p-1 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
              title="Copy to clipboard"
            >
              <Copy size={14} />
            </button>
          )}

          {/* Toggle Secret */}
          {isSecret && (
            <button
              onClick={onToggleSecret}
              className="p-1 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
              title={isSecret ? "Show value" : "Hide value"}
            >
              {isSecret ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          )}

          {/* Regenerate */}
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={regenerating}
              className="p-1 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-zinc-800 transition-colors"
              title="Regenerate"
            >
              <RefreshCw
                size={14}
                className={regenerating ? "animate-spin" : ""}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default ProfileField;