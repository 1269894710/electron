var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var mainWindow = null
var globalShortcut = electron.globalShortcut // 注册全局快捷键

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  globalShortcut.register('ctrl+e', () => {
    mainWindow.loadURL('https://jspang.com/detailed?id=62')
  })
  mainWindow.webContents.openDevTools() // 打开调试窗口
  // 创建菜单
  require('./render/menu.js')

  mainWindow.loadFile('index.html')

  // BrowserView 页面嵌入窗口
  var BrowserView = electron.BrowserView
  var view = new BrowserView()
  mainWindow.setBrowserView(view)
  view.setBounds({
    x: 0,
    y: 420,
    width: 500,
    height: 400
  })
  view.webContents.loadURL('https://jspang.com/detailed?id=62')
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

// 注销全局快捷键
app.on('will-quit', () => {
  globalShortcut.unregister('ctrl+e')
  globalShortcut.unregisterAll()
})