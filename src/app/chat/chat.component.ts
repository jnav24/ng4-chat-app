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
  users: Users[];

  constructor(
      private route: ActivatedRoute,
      private chatService: ChatService,
      private usersService: UsersService,
      private router: Router) { }

  ngOnInit() {
    this.chatService.user.subscribe(user => {
      if (user === null || typeof user.uid === 'undefined') {
        this.router.navigate(['login']);
      }
    });
    this.getUsersList();
  }

  logout() {
    this.chatService.logoutUser()
        .then(auth => {
          this.router.navigate(['login']);
        })
        .catch(error => console.log(error));
  }

  private getUsersList() {
    this.usersService.getAllUsers().subscribe(users => this.users = users);
  }
}
