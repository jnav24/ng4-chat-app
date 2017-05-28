import { Route } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";

export const appRouter: Route[] = [
    { path: '', component: SignInComponent },
    { path: 'login', component: SignInComponent },
    { path: 'register', component: SignInComponent },
    { path: '**', redirectTo: 'login' },
];