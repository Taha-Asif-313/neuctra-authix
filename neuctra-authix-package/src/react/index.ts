// ------------------------------
// React Authentication Components
// ------------------------------

// 🔑 User Sign Up form component
// Allows new users to register with email, password, and optional profile info
export { ReactUserSignUp } from "./UserSignUp.js";

// 🔑 User Login form component
// Handles authentication for existing users via email/password or social login
export { ReactUserLogin } from "./UserLogin.js";

// ✅ Conditional wrapper that only renders its children if a user is signed in
// Useful for protecting routes or UI elements meant for authenticated users
export { ReactSignedIn } from "./SignedIn.js";

// 🚪 Conditional wrapper that only renders its children if a user is signed out
// Useful for showing login or signup forms when no user is authenticated
export { ReactSignedOut } from "./SignedOut.js";

// 👤 Displays authenticated user's profile information
// Can include name, email, avatar, or other metadata
export { ReactUserProfile } from "./UserProfile.js";

// 🔘 User button component
// Displays user avatar, name, and menu options (logout, profile, settings, etc.)
export { ReactUserButton } from "./UserButton.js";

// ✉️ User email verification component
// Handles sending OTP and verifying the user's email address
export { ReactEmailVerification } from "./UserVerify.js";

// ✉️ User email verification component
// Handles sending OTP and verifying the user's email address
export { AuthixProvider } from "./Provider/AuthixProvider.js";


export { TailUserButton } from "./TailUserButton.js";