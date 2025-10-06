import CryptoJS from "crypto-js";
import bcrypt from "bcrypt"

export function generateId() {
  return  CryptoJS.lib.WordArray.random(16).toString(); // 32-char hex
}

export function generateApiKey() {
  return CryptoJS.lib.WordArray.random(32).toString(); // 64-char hex
}

/**
 * Helper to securely hash OTP before saving
 */
export const hashOTP = async (otp) => {
  return await bcrypt.hash(otp, 10);
};

export const verifyHashedOTP = async (plainOtp, hashedOtp) => {
  if (!plainOtp || !hashedOtp) return false;
  return await bcrypt.compare(plainOtp, hashedOtp);
};

