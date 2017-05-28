import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth/auth";

@Injectable()
export class ChatService {
  user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  logoutUser() {
    return this.auth.auth.signOut();
  }
}
