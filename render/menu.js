var {Menu, BrowserWindow} = require('electron')

var template = [
  {
    label: "一级菜单1",
    submenu: [
      {
        label: "二级菜单1",
        accelerator: 'ctrl+n',
        click: () => {
          var win = new BrowserWindow({
            width: 500,
            height: 500,
            webPreferences: {
              nodeIntegration: true
            }
          })
          win.loadFile('newWin.html')
          win.on('closed', () => {
            win = null
          })
        }
      },
      {label: "二级菜单2"}
    ]
  },
  {
    label: "一级菜单2",
    submenu: [
      {label: "二级菜单3"},
      {label: "二级菜单4"}
    ]
  }
]

var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)