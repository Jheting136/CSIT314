import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient for standalone
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

console.log('Starting Angular app...');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideHttpClient()]  // Provide HttpClient for your application
})
  .catch((err) => console.error(err));
