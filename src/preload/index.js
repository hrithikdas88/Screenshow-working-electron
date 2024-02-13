import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
console.log('preload.js is loaded');
const api = {};
let indexBridge = {
  something: (callback) => ipcRenderer.on("something", callback),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      takeScreenshot: () => {
        ipcRenderer.send('take-screenshot');
      },
    });
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('indexBridge', indexBridge);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = {
    ...electronAPI,
    takeScreenshot: () => {
      ipcRenderer.send('take-screenshot');
    },
  };
  window.api = api;
}
