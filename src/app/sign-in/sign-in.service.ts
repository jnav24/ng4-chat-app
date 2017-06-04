import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs";
import { Users } from '../common/models/users.model';
import * as firebase from 'firebase/app';

@Injectable()
export class SignInService {
  user: Observable<firebase.User>;

  constructor(private af: AngularFireDatabase, private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  addUser(user: Users) {
    const users = this.af.list('/users');
    return users.push(user);
  }

  createNewUser(email: string, pass: string): firebase.Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(email, pass);
  }

  loginUser(email: string, pass: string): firebase.Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }
}
