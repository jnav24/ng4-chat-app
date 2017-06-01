import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class UsersService {

  constructor(private af: AngularFireDatabase) { }

  getAllUsers() {
    return this.af.list('/users');
  }
}
