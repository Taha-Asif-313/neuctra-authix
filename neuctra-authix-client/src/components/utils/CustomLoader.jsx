const CustomLoader = ({
  logo = "/logo.png", // Path to logo
  size = 80, // Outer loader size in px
  logoSize = 40, // Logo size in px
  color = "border-primary", // Tailwind color class for the spinning ring
  text = "", // Optional text below loader
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer spinning circle */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${color}`}
        />

        {/* Logo in the center */}
        <img
          src={logo}
          alt="Logo"
          className="rounded-full absolute top-1/2 left-1/2"
          style={{
            width: logoSize,
            height: logoSize,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Optional text */}
      {text && <p className="text-gray-400 mt-4 text-sm">{text}</p>}
    </div>
  );
};

export default CustomLoader;
