import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
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
  selected_user;

  constructor(
      private chatService: ChatService,
      private usersService: UsersService,
      private fb: FormBuilder,
      private channelsService: ChannelsService,
      private route: ActivatedRoute,
      private router: Router) {
    route.data.subscribe(u => {
      this.user = u['user'][0];
    });
  }

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
    this.channel_id = user_selected.channel_id;
    this.selected_user = user_selected.$key;

    this.channelsService.getMessages(user_selected.channel_id).subscribe(messages => {
      this.messages = messages;
      setTimeout(() => { this.setScrollBar() }, 500 );
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

  private getChannelId(user) {
    let channel_id = this.channelsService.getChannelList().filter(channel => {
      return typeof channel[this.user['$key']] !== 'undefined'
          && typeof channel[user['$key']] !== 'undefined'
    });

    if (!channel_id.length) {
      return this.channelsService.createChannel(this.user['$key'], user.$key).key;
    }

    return channel_id[0].$key;
  }

  private getUsersList(uid) {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users
          .filter(user => { return uid != user.user_id })
          .map(user => {
            user = this.usersService.getUserImage(user);
            user['channel_id'] = this.getChannelId(user);

            this.channelsService.getLastMessage(user['channel_id']).subscribe(msg => {
              const message = msg;

              if (typeof message[0] !== 'undefined') {
                user['last_msg'] = message[0].message;
              }
            });

            return user;
          });
    });
  }

  private setScrollBar() {
    const element = document.getElementById("chat_area");

    if (typeof element !== 'undefined' && element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }
}
