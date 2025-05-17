/**
 * Sets up the UI manager functionality
 * @returns {Object} - The UI manager object
 */
export function setupUIManager() {
  // Get UI elements
  const uploadContainer = document.getElementById("uploadContainer");
  const processingContainer = document.getElementById("processingContainer");
  const resultContainer = document.getElementById("resultContainer");
  const errorContainer = document.getElementById("errorContainer");

  const progressBar = document.getElementById("progressBar");
  const originalPreview = document.getElementById("originalPreview");
  const reducedPreview = document.getElementById("reducedPreview");
  const originalSize = document.getElementById("originalSize");
  const reducedSize = document.getElementById("reducedSize");
  const reductionPercentage = document.getElementById("reductionPercentage");

  const errorTitle = document.getElementById("errorTitle");
  const errorMessage = document.getElementById("errorMessage");

  /**
   * Shows the processing UI
   */
  const showProcessing = () => {
    uploadContainer.classList.add("hidden");
    processingContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");

    // Reset progress bar
    updateProgress(0);
  };

  /**
   * Shows the result UI
   */
  const showResult = () => {
    uploadContainer.classList.add("hidden");
    processingContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    errorContainer.classList.add("hidden");

    // Add animation class
    resultContainer.classList.add("fade-in");
    setTimeout(() => {
      resultContainer.classList.remove("fade-in");
    }, 500);
  };

  /**
   * Shows the error UI
   * @param {string} title - The error title
   * @param {string} message - The error message
   */
  const showError = (title, message) => {
    uploadContainer.classList.add("hidden");
    processingContainer.classList.add("hidden");
    resultContainer.classList.add("hidden");
    errorContainer.classList.remove("hidden");

    // Set error message
    errorTitle.textContent = title;
    errorMessage.textContent = message;

    // Add animation class
    errorContainer.classList.add("fade-in");
    setTimeout(() => {
      errorContainer.classList.remove("fade-in");
    }, 500);
  };

  /**
   * Resets the UI to the initial state
   */
  const resetUI = () => {
    uploadContainer.classList.remove("hidden");
    processingContainer.classList.add("hidden");
    resultContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");

    // Clear previews
    originalPreview.innerHTML = "";
    reducedPreview.innerHTML = "";

    // Reset file information
    originalSize.textContent = "0";
    reducedSize.textContent = "0";
    reductionPercentage.textContent = "0";

    // Reset progress bar
    updateProgress(0);

    // Clear file input
    document.getElementById("fileInput").value = "";
  };

  /**
   * Updates the progress bar
   * @param {number} percent - The progress percentage (0-100)
   */
  const updateProgress = (percent) => {
    progressBar.style.width = `${percent}%`;
  };

  /**
   * Updates the original image preview and info
   * @param {string} previewUrl - The preview data URL
   * @param {string} fileName - The file name
   * @param {number} fileSize - The file size in bytes
   */
  const updateOriginalPreview = (previewUrl, fileName, fileSize) => {
    // Create and set the preview image
    const img = document.createElement("img");
    img.src = previewUrl;
    img.alt = fileName;
    img.classList.add("preview-image");

    // Clear and update the preview container
    originalPreview.innerHTML = "";
    originalPreview.appendChild(img);

    // Update the file size (convert to KB)
    originalSize.textContent = (fileSize / 1024).toFixed(2);
  };

  /**
   * Updates the reduced image preview and info
   * @param {string} previewUrl - The preview data URL
   * @param {string} fileName - The file name
   * @param {number} fileSize - The file size in bytes
   */
  const updateReducedPreview = (previewUrl, fileName, fileSize) => {
    // Create and set the preview image
    const img = document.createElement("img");
    img.src = previewUrl;
    img.alt = fileName;
    img.classList.add("preview-image");

    // Clear and update the preview container
    reducedPreview.innerHTML = "";
    reducedPreview.appendChild(img);

    // Update the file size (convert to KB)
    reducedSize.textContent = (fileSize / 1024).toFixed(2);
  };

  /**
   * Updates the reduction info
   * @param {number} percentage - The reduction percentage
   */
  const updateReductionInfo = (percentage) => {
    reductionPercentage.textContent = percentage;
  };

  return {
    showProcessing,
    showResult,
    showError,
    resetUI,
    updateProgress,
    updateOriginalPreview,
    updateReducedPreview,
    updateReductionInfo,
  };
}
