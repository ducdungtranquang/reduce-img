/**
 * Sets up the file upload functionality
 * @param {Object} uiManager - The UI manager object
 * @param {Object} imageProcessor - The image processor object
 * @param {Object} downloadManager - The download manager object
 */
export function setupFileUpload(uiManager, imageProcessor, downloadManager) {
  const fileInput = document.getElementById('fileInput')
  const uploadArea = document.getElementById('uploadArea')
  const uploadContainer = document.getElementById('uploadContainer')

  // File input change event
  fileInput.addEventListener('change', (event) => {
    handleFileSelection(event.target.files, uiManager, imageProcessor, downloadManager)
  })

  // Drag and drop events
  uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault()
    uploadArea.classList.add('drag-over')
  })

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over')
  })

  uploadArea.addEventListener('drop', (event) => {
    event.preventDefault()
    uploadArea.classList.remove('drag-over')
    
    if (event.dataTransfer.files.length > 0) {
      handleFileSelection(event.dataTransfer.files, uiManager, imageProcessor, downloadManager)
    }
  })

  // Click on upload area to trigger file input
  uploadArea.addEventListener('click', (event) => {
    // Prevent click if the target is the upload button (which has its own click handler)
    if (!event.target.classList.contains('upload-button')) {
      fileInput.click()
    }
  })
}

/**
 * Handles the file selection process
 * @param {FileList} files - The selected files
 * @param {Object} uiManager - The UI manager object
 * @param {Object} imageProcessor - The image processor object
 * @param {Object} downloadManager - The download manager object
 */
function handleFileSelection(files, uiManager, imageProcessor, downloadManager) {
  if (files.length === 0) return

  const file = files[0]
  
  // Validate file type
  if (!isValidImageType(file)) {
    uiManager.showError('Invalid File Type', 'Please select a PNG image file.')
    return
  }

  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    uiManager.showError('File Too Large', 'Please select an image under 10MB.')
    return
  }

  // Process the valid file
  processValidFile(file, uiManager, imageProcessor, downloadManager)
}

/**
 * Checks if the file is a valid image type (PNG)
 * @param {File} file - The file to validate
 * @returns {boolean} - Whether the file is valid
 */
function isValidImageType(file) {
  return file.type === 'image/png'
}

/**
 * Processes a valid file
 * @param {File} file - The valid file to process
 * @param {Object} uiManager - The UI manager object
 * @param {Object} imageProcessor - The image processor object
 * @param {Object} downloadManager - The download manager object
 */
function processValidFile(file, uiManager, imageProcessor, downloadManager) {
  // Show processing UI
  uiManager.showProcessing()
  
  // Create a file preview
  createImagePreview(file).then(preview => {
    // Update original image preview and info
    uiManager.updateOriginalPreview(preview, file.name, file.size)
    
    // Process the image
    imageProcessor.processImage(file).then(reducedFile => {
      // Update reduced image preview and info
      createImagePreview(reducedFile).then(reducedPreview => {
        uiManager.updateReducedPreview(reducedPreview, reducedFile.name, reducedFile.size)
        
        // Calculate reduction percentage
        const reductionPercentage = calculateReductionPercentage(file.size, reducedFile.size)
        uiManager.updateReductionInfo(reductionPercentage)
        
        // Set up download for the reduced file
        downloadManager.setDownloadFile(reducedFile)
        
        // Show result UI
        uiManager.showResult()
      })
    }).catch(error => {
      console.error('Error processing image:', error)
      uiManager.showError('Processing Failed', 'There was an error processing your image. Please try again.')
    })
  }).catch(error => {
    console.error('Error creating preview:', error)
    uiManager.showError('Preview Failed', 'There was an error creating a preview of your image. Please try again.')
  })
}

/**
 * Creates an image preview from a file
 * @param {File} file - The image file
 * @returns {Promise<string>} - A promise that resolves to the image data URL
 */
function createImagePreview(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    
    reader.onerror = (error) => {
      reject(error)
    }
    
    reader.readAsDataURL(file)
  })
}

/**
 * Calculates the reduction percentage
 * @param {number} originalSize - The original file size
 * @param {number} reducedSize - The reduced file size
 * @returns {number} - The reduction percentage
 */
function calculateReductionPercentage(originalSize, reducedSize) {
  if (originalSize === 0) return 0
  
  const reduction = originalSize - reducedSize
  const percentage = (reduction / originalSize) * 100
  
  return Math.round(percentage)
}