const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')

function createWindow() {

    const platform = require('os').platform()

    let trayIcon = null;

    if (platform == 'win32') {
        trayIcon = path.join(__dirname, '', 'assets/tray-icon.ico')
    }
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // Create tray icon
    appIcon = new Tray(trayIcon)

    // Create RightClick context menu for tray icon
    // with two items - 'Restore app' and 'Quit app'
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Restore app',
            click: () => {
                win.show()
            }
        },
        {
            label: 'Quit app',
            click: () => {
                win.close()
            }
        }
    ])

    // Set title for tray icon
    appIcon.setTitle('Grease the Groove')

    // Set toot tip for tray icon
    appIcon.setToolTip('Grease the Groove')

    // Create RightClick context menu
    appIcon.setContextMenu(contextMenu)

    // Restore (open) the app after clicking on tray icon
    // if window is already open, minimize it to system tray
    appIcon.on('click', () => {
        win.isVisible() ? win.hide() : win.show()
    })

    // and load the index.html of the app.
    win.loadFile('index.html')

     // Don't show until we are ready and loaded
     win.once('ready-to-show', () => {
        win.show()

    // Open the DevTools automatically if developing
    if (true) {
        win.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  win.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // Minimize window to system tray
  win.on('minimize',function(event){
      event.preventDefault()
      win.hide()
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
