import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
import {AngularFireAuth} from "angularfire2/auth/auth";
import * as firebase from 'firebase/app';

@Injectable()
export class UsersService {

  constructor(private af: AngularFireDatabase, private auth: AngularFireAuth) {}

  getAllUsers() {
    return this.af.list('/users');
  }

  getUserImage(user) {
    if (typeof user['image'] === 'undefined') {
      user['image'] = '';
    }

    return user;
  }

  updateUserProfile(key, update) {
    // @TODO:
    // firebase will not allow user to edit their email unless they re-sign in
    if (typeof update.email !== 'undefined') {
      const userAuth = firebase.auth().currentUser;
      userAuth.updateEmail(update.email)
          .then(() => console.log('updated')).catch(error => console.log(error));
    }

    const user = this.af.object(`/users/${key}`);
    user.update(update);
  }

  logoutUser() {
    return this.auth.auth.signOut();
  }
}
