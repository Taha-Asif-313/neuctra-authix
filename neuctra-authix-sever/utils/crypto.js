import CryptoJS from "crypto-js";


export function generateId() {
  return  CryptoJS.lib.WordArray.random(16).toString(); // 32-char hex
}

export function generateApiKey() {
  return CryptoJS.lib.WordArray.random(32).toString(); // 64-char hex
}

