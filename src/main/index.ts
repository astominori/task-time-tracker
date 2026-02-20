import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { registerStoreHandlers } from './store'

// Allowlist of URL schemes safe to open externally
const SAFE_URL_SCHEMES = ['https:', 'http:']

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 480,
    height: 700,
    minWidth: 400,
    minHeight: 600,
    resizable: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,           // Enable Chromium process sandbox
      contextIsolation: true,  // Isolate renderer from main context
      nodeIntegration: false   // Deny Node.js access in renderer
    },
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 15, y: 10 }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Enforce Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived((_details, callback) => {
    callback({
      responseHeaders: {
        ..._details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'"
        ]
      }
    })
  })

  // Only allow safe URL schemes to be opened externally
  mainWindow.webContents.setWindowOpenHandler((details) => {
    try {
      const url = new URL(details.url)
      if (SAFE_URL_SCHEMES.includes(url.protocol)) {
        shell.openExternal(details.url)
      }
    } catch {
      // Malformed URL — ignore
    }
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  registerStoreHandlers()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
