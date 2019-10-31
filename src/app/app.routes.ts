/* Main router of the application */

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './login/register.component';

const appRoute: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PagenotfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoute, { useHash: true });
