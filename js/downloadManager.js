/**
 * Sets up the download manager functionality
 * @param {Object} uiManager - The UI manager object
 * @returns {Object} - The download manager object
 */
export function setupDownloadManager(uiManager) {
  let downloadFile = null
  const downloadButton = document.getElementById('downloadButton')

  // Add click event listener to the download button
  downloadButton.addEventListener('click', () => {
    if (downloadFile) {
      downloadReducedImage()
    } else {
      uiManager.showError('Download Error', 'No reduced image available for download.')
    }
  })

  /**
   * Sets the file to be downloaded
   * @param {File} file - The file to download
   */
  const setDownloadFile = (file) => {
    downloadFile = file
    
    // Enable the download button
    downloadButton.removeAttribute('disabled')
    downloadButton.classList.remove('disabled')
  }

  /**
   * Downloads the reduced image
   */
  const downloadReducedImage = () => {
    // Create a URL for the file
    const downloadUrl = URL.createObjectURL(downloadFile)
    
    // Create a temporary link element
    const downloadLink = document.createElement('a')
    downloadLink.href = downloadUrl
    downloadLink.download = downloadFile.name
    
    // Append to body, click, and remove
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    
    // Revoke the object URL to free memory
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 100)
    
    // Show downloading feedback (optional)
    showDownloadingFeedback()
  }

  /**
   * Shows downloading feedback to the user
   */
  const showDownloadingFeedback = () => {
    const originalText = downloadButton.textContent
    downloadButton.textContent = 'Downloading...'
    downloadButton.classList.add('downloading')
    
    // Reset the button text after a short delay
    setTimeout(() => {
      downloadButton.textContent = originalText
      downloadButton.classList.remove('downloading')
    }, 1500)
  }

  /**
   * Resets the download manager
   */
  const reset = () => {
    downloadFile = null
    downloadButton.setAttribute('disabled', 'disabled')
    downloadButton.classList.add('disabled')
  }

  return {
    setDownloadFile,
    reset
  }
}