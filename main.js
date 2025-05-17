import './style.css'
import { setupFileUpload } from './js/fileUpload.js'
import { setupImageProcessor } from './js/imageProcessor.js'
import { setupDownloadManager } from './js/downloadManager.js'
import { setupUIManager } from './js/uiManager.js'

// Initialize the application components
document.addEventListener('DOMContentLoaded', () => {
  const uiManager = setupUIManager()
  const imageProcessor = setupImageProcessor(uiManager)
  const downloadManager = setupDownloadManager(uiManager)
  setupFileUpload(uiManager, imageProcessor, downloadManager)

  // Setup reset buttons
  document.getElementById('resetButton').addEventListener('click', () => {
    uiManager.resetUI()
  })

  document.getElementById('errorResetButton').addEventListener('click', () => {
    uiManager.resetUI()
  })
})