const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // اختياري
    },
    // إخفاء شريط القوائم الافتراضي ليظهر كبرنامج نظيف ومستقل
    autoHideMenuBar: true
  });

  // تحميل ملف HTML الخاص بك دون أي تعديل عليه
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // يمكنك إلغاء التعليق عن السطر التالي لفتح أدوات المطور (F12) أثناء التجربة:
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
