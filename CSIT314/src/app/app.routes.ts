import { Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component'; // Make sure to import your LoginComponent
//import { HomeComponent } from './home/home.component';


//add new routes here
export const routes: Routes = [
    //{ path: '', component: HomeComponent },       // Default route
    { path: 'login', component: LoginComponent }, // Login route
];
