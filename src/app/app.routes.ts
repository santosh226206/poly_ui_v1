import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule) }
];
