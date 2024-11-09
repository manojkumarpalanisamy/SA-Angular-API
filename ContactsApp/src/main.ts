import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Check if the app is in production mode
if (environment.production) {
  enableProdMode();  // Enable production optimizations if the app is in production mode
}

// Bootstrap the root module (AppModule)
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));  // Catch any errors during the bootstrapping process
