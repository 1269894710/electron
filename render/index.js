var fs = require('fs')

// 打开新窗口
var btn1 = this.document.querySelector('#btn1')
var BrowserWindow = require('electron').remote.BrowserWindow

window.onload = function () {
  var btn = this.document.querySelector('#btn')
  var warp = this.document.querySelector('#warp')
  btn.onclick = function () {
    fs.readFile('text.txt', (err, data) => {
      warp.innerHTML = data
    })
  }

  // 打开新窗口
  btn1.onclick = () => {
    newWin = new BrowserWindow({
      width: 500,
      height: 500,
    })
    newWin.loadFile('newWin.html')
    newWin.on('closed', () => {
      newWin = null
    })
  }
}

// 右键事件
var {remote} = require('electron')
var rightTemp = [
  {label: '复制', accelerator: 'ctrl+c'},
  {label: '粘贴', accelerator: 'ctrl+v'}
]
var m = remote.Menu.buildFromTemplate(rightTemp)
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  m.popup({
    window: remote.getCurrentWindow()
  })
})

// 打开新链接
var {shell} = require('electron')
var link = document.querySelector('#link')
link.onclick = function (e) {
  e.preventDefault()
  var href = this.getAttribute('href')
  shell.openExternal(href)
}

// 打开子窗口
var btn2 = document.querySelector('#btn2')
btn2.onclick = function (e) {
  e.preventDefault()
  window.open('./popup-page.html')
}

// 接受子窗口传递的信息
window.addEventListener('message', (res) => {
  var warp1 = document.querySelector('#warp1')
  warp1.innerHTML = res.data
})

// 打开文件窗口
var {dialog} = require('electron').remote
var btn4 = document.querySelector('#btn4')
btn4.onclick = function (e) {
  dialog.showOpenDialog({
    title: '我是文件窗口',
    // defaultPath: '1.txt',
    // filters: [
    //   {name: 'file', extensions: ['jpg', 'png']}
    // ],
    // buttonLabel: '自定义文字'
  }).then(res => {
    var img = document.querySelector('#img')
    img.setAttribute('src', res.filePaths[0])
  }).catch(err => {
    console.log(err)
  })
}

// 保存文件窗口
var {dialog} = require('electron').remote
var fs = require('fs')
var btn5 = document.querySelector('#btn5')
btn5.onclick = function (e) {
  dialog.showSaveDialog({
    title: '保存文件',
  }).then(res => {
    console.log(res)
    fs.writeFileSync(res.filePath, '测试数据')
  }).catch(err => {
    console.log(err)
  })
}

// 打开消息提示窗口
var {dialog} = require('electron').remote
var fs = require('fs')
var btn6 = document.querySelector('#btn6')
btn6.onclick = function (e) {
  dialog.showMessageBox({
    type: 'warning',
    title: '消息提示',
    message: '消息内容',
    buttons: ['不行', '可以']
  }).then(res => {
    console.log(res)
  })
}

// 断网提醒测试 h5事件监听
window.addEventListener('online', () => {
  alert('网络连接上了')
})
window.addEventListener('offline', () => {
  alert('网络断开了')
})

// 打开消息提示窗口
var btn7 = document.querySelector('#btn7')
var option = {
  title: '标题',
  body: '测试内容'
}
btn7.onclick = function (e) {
  new window.Notification(option.title, option)
}

// 复制激活码
var {clipboard} = require('electron')
var btn8 = document.querySelector('#btn8')
var code = document.querySelector('#code')
btn8.onclick = function (e) {
  clipboard.writeText(code.innerHTML)
  alert('复制成功')
}