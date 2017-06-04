import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class ChannelsService {
  private channels;

  constructor(private af: AngularFireDatabase) {
    this.channels = this.af.list('/channels');
  }

  createChannel(user_key, user_selected_key) {
    let channel = {};
    channel[user_key] = true;
    channel[user_selected_key] = true;
    return this.channels.push(channel);
  }

  getChannels() {
    return this.channels;
  }

  getMessages(channel_id) {
    return this.af.list(`chat/${channel_id}`);
  }

  sendMessage(channel_id, message) {
    console.log(channel_id);
    console.log(message);
    // return this.af.list(`channels/${channel_id}`).push(message);
  }
}