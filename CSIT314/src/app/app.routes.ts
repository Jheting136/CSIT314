import { Routes } from '@angular/router';
import { LoginComponent } from './views/test/login.component';
//import { HomeComponent } from './home/home.component';


//add new routes here
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, //default
    { path: 'login', component: LoginComponent }, // Login route
];
