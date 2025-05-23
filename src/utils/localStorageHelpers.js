// src/utils/localStorageHelpers.js

/**
 * Retrieve data from localStorage by key.
 * @param {string} key - The localStorage key.
 * @param {any} fallback - Fallback value if data is not found.
 * @returns {any} Parsed data from localStorage or fallback.
 */
export function getLocalData(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("Error reading from localStorage", e);
    return fallback;
  }
}

/**
 * Save data to localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} data - The data to save.
 */
export function saveLocalData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error writing to localStorage", e);
  }
}

/**
 * Remove data from localStorage by key.
 * @param {string} key - The localStorage key.
 */
export function removeLocalData(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing from localStorage", e);
  }
}
