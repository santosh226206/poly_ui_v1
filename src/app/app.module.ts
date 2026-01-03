import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
