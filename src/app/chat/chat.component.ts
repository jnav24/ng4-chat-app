import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ChatService} from "./chat.service";
import {UsersService} from "../common/services/users.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user;
  users;
  openProfileWindow = false;

  constructor(
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

  isUserImageAvailable(user) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return user.image != '' && user.image != null && urlregex.test(user.image);
  }

  toggleOpenProfile() {
    this.openProfileWindow = !this.openProfileWindow;
  }

  private getCurrentUser(uid) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].user_id === uid) {
        this.user = this.users[i];
        this.users.splice(i, 1);
      }
    }
  }

  private getUsersList(uid) {
    this.usersService.getAllUsers().do(console.log).subscribe(users => {
      this.users = users.map(user => {
          return this.usersService.getUserImage(user);
      });
      this.getCurrentUser(uid);
    });
  }
}
