import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "./chat.service";
import {UsersService} from "../common/services/users.service";
import { Users } from '../common/models/users.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user;
  users;

  constructor(
      private route: ActivatedRoute,
      private chatService: ChatService,
      private usersService: UsersService,
      private router: Router) { }

  ngOnInit() {
    this.chatService.user.subscribe(user => {
      if (user === null || typeof user.uid === 'undefined') {
        this.router.navigate(['login']);
      } else {
        this.getUsersList(user.uid);
      }
    });
  }

  logout() {
    this.chatService.logoutUser()
        .then(auth => {
          this.router.navigate(['login']);
        })
        .catch(error => console.log(error));
  }

  private getCurrentUser(uid) {
    this.user = this.users.filter(user => {
      return user.user_id === uid;
    })[0];
  }

  private getUsersList(uid) {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
      this.getCurrentUser(uid);
    });
  }
}
