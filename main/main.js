import { app, BrowserWindow } from 'electron';

/**
 * This is the main entrypoint file for the whole Electron app.
 * It creates a browser window, loads the index.html file and opens dev tools
 */

const createWindow = async () => {
    console.log('Hello, motherfucker 👋')

    const win = new BrowserWindow({
        width: 1280,
        height: 720
    })

    win.loadFile('src/index.html')
        .catch(err => console.log(err))
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    console.log('Goodbye, motherfucker 🖕')
    app.quit()
})
