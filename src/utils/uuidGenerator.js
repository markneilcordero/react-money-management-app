// src/utils/uuidGenerator.js

/**
 * Generates a unique ID (sufficient for localStorage and frontend-only use).
 * @returns {string} A pseudo-random unique ID
 */
export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 6)}`;
}
