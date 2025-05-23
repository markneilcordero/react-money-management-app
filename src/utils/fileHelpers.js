// src/utils/fileHelpers.js

/**
 * Triggers a download of a JSON file containing the provided data.
 * @param {Object} data - The data object to export
 * @param {string} filename - The filename to use for the downloaded file (e.g., "backup.json")
 */
export function downloadJSONFile(data, filename) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
}

/**
 * Reads and parses a JSON file uploaded by the user.
 * @param {File} file - The uploaded .json file
 * @returns {Promise<Object>} - A promise that resolves with the parsed JSON object
 */
export function parseJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        resolve(json);
      } catch (error) {
        reject(new Error("Invalid JSON format."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsText(file);
  });
}
