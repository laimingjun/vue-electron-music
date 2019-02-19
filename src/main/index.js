// 'use strict'

const {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut
} = require('electron')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow = null
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 692,
    width: 1024,
    minHeight: 692,
    minWidth: 1024,
    frame: false,
    transparent: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  // 监听快捷键
  globalShortcut.register('ESC', () => {
    mainWindow.setFullScreen(false)
  })
  globalShortcut.register('F12', () => {
    mainWindow.openDevTools()
  })
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 关闭
ipcMain.on('window-all-closed', () => {
  app.quit()
})

app.on('before-quit', (e) => {
  mainWindow = null
})

// 隐藏
ipcMain.on('hide-window', () => {
  mainWindow.minimize()
})

// 最大化
ipcMain.on('max-window', () => {
  mainWindow.maximize()
})

// 还原
ipcMain.on('orignal-window', () => {
  mainWindow.unmaximize()
})

// 全屏
ipcMain.on('full-screen-window', () => {
  mainWindow.setFullScreen(true)
})

// 退出全屏
ipcMain.on('quit-full-screen-window', () => {
  mainWindow.setFullScreen(false)
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */