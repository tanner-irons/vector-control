import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const electron = (<any>window).require('electron');

if (environment.production) {
  enableProdMode();
}

electron.ipcRenderer.on('token', (event, token) => {
  localStorage.setItem('token', token);
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
