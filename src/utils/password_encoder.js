import CryptoJS from 'crypto-js';

export function encodePassword(password) {
  return CryptoJS.SHA256(password).toString();
}
