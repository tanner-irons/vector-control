const electron = require('electron')

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

const { app, Tray, Menu, BrowserWindow, session, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const axios = require('axios').default;
var spawn = require("child_process").spawn; 

function createMainWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }

        return false;
    });

    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    
    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });

    return mainWindow;
};

function createAuthWindow(mainWindow) {
    var authWindow = new BrowserWindow({
        show: false,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: false
        }
    });

    authWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        authWindow = null;
    });

    return authWindow;
}

function init() {
    var fs = require('fs');
    var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

    const platform = require('os').platform();

    const mainWindow = createMainWindow();
    const authWindow = createAuthWindow();

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Restore app',
            click: () => {
                mainWindow.show();
            }
        },
        {
            label: 'Quit app',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    let trayIcon = null;
    if (platform == 'win32') {
        trayIcon = path.join(__dirname, '', 'assets/tray-icon.ico');
    }

    appIcon = new Tray(trayIcon);
    appIcon.setTitle('Vector Control');
    appIcon.setToolTip('Vector Control');
    appIcon.setContextMenu(contextMenu);
    appIcon.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });

    session.defaultSession.webRequest.onBeforeRedirect(function (event) {
        let params = new URLSearchParams(event.redirectURL.replace('http://localhost/', ''));
        const data = new URLSearchParams({
            grant_type: 'authorization_code',
            code: params.get('code'),
            redirect_uri: 'http://localhost',
            client_id: config.client_id,
            client_secret: config.client_secret
        });
        axios.post(`https://login.microsoftonline.com/${config.tenant}/oauth2/v2.0/token`,
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                mainWindow.webContents.send('token', response.data.access_token);
                authWindow.close();
            });
    });

    ipcMain.on('schedule', (event, title, location, reminder) => {
        const process = spawn('python',['./src/vector-scripts/schedule.py', '--title', title, '--location', location, '--reminder', reminder] ); 
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, '/dist/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );
    mainWindow.webContents.openDevTools()
    var authURL = `https://login.microsoftonline.com/${config.tenant}/oauth2/v2.0/authorize?client_id=${config.client_id}&response_type=code&scope=openid+https://outlook.office.com/Calendars.Read.Shared`;
    authWindow.loadURL(authURL);
    authWindow.show();
}

// Init
app.on('ready', init);
