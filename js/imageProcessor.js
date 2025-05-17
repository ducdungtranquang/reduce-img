/**
 * Sets up the image processor functionality
 * @param {Object} uiManager - The UI manager object
 * @returns {Object} - The image processor object
 */
export function setupImageProcessor(uiManager) {
  const API_BASE_URL = "http://103.146.23.106:8080";

  /**
   * Processes an image file
   * @param {File} file - The image file to process
   * @returns {Promise<File>} - A promise that resolves to the processed file
   */
  const processImage = async (file) => {
    try {
      // Create FormData for the API request
      const formData = new FormData();
      formData.append("file", file);

      // Send the image to the API
      const response = await fetch(`${API_BASE_URL}/compress`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      // Parse the JSON response
      const data = await response.json();

      if (!data.download_url) {
        throw new Error("Invalid response from server");
      }

      // Fetch the processed image using the download URL
      const imageResponse = await fetch(`${API_BASE_URL}${data.download_url}`);

      if (!imageResponse.ok) {
        throw new Error("Failed to download processed image");
      }

      // Get the processed image blob
      const processedBlob = await imageResponse.blob();

      // Create a new File from the blob
      const reducedFile = new File(
        [processedBlob],
        file.name.replace(".png", "_reduced.png"),
        { type: "image/png" }
      );

      return reducedFile;
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    }
  };

  return {
    processImage,
  };
}
