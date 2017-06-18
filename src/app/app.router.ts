import { Route } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {ChatComponent} from "./chat/chat.component";
import {UsersResolver} from "./common/resolvers/users.resolver";

export const appRouter: Route[] = [
    { path: '', component: SignInComponent },
    { path: 'login', component: SignInComponent },
    { path: 'register', component: SignInComponent },
    { path: 'chat/:uid', component: ChatComponent, resolve: { user: UsersResolver } },
    { path: '**', redirectTo: 'login' },
];