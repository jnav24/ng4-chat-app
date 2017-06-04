import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ChatService} from "./chat.service";
import {UsersService} from "../common/services/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChannelsService} from "../common/services/channels.service";
import {Messages} from '../common/models/messages.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user;
  users;
  channel_id: string;
  chat: FormGroup;
  messages;
  openProfileWindow = false;
  test_loop = Array(50).fill(4);

  constructor(
      private chatService: ChatService,
      private usersService: UsersService,
      private fb: FormBuilder,
      private channelsService: ChannelsService,
      private router: Router) { }

  ngOnInit() {
    this.chatService.user.subscribe(user => {
      if (user === null || typeof user.uid === 'undefined') {
        this.router.navigate(['login']);
      } else {
        this.getUsersList(user.uid);
        this.setScrollBar();
      }
    });

    this.chat = this.fb.group({
      message: ['', [Validators.required]],
    });

  }

  getMessages(user_selected) {
    this.channelsService.getChannels().subscribe(channels => {
      let channel_id = channels.filter(channel => {
        return typeof channel[this.user['$key']] !== 'undefined'
            && typeof channel[user_selected.$key] !== 'undefined'
      });

      if(!channel_id.length) {
        this.channelsService.createChannel(this.user['$key'], user_selected.$key).key;
      } else {
        this.channel_id = channel_id[0].$key;
        this.channelsService.getMessages(this.channel_id).subscribe(messages => {
          this.messages = messages;
        });
      }
    });
  }

  isUserImageAvailable(user) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return user.image != '' && user.image != null && urlregex.test(user.image);
  }

  sendMessage() {
    const message = new Messages(this.user['$key'], this.chat.value.message, firebase.database.ServerValue.TIMESTAMP);
    this.channelsService.sendMessage(this.channel_id, message);
    this.chat.reset();
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
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users.map(user => {
        return this.usersService.getUserImage(user);
      });
      this.getCurrentUser(uid);
    });
  }

  private setScrollBar() {
    const element = document.getElementById("chat_area");

    if (typeof element !== 'undefined' && element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }
}
