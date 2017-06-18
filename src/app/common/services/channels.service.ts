import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class ChannelsService {
  private channels;
  private allChannels;

  constructor(private af: AngularFireDatabase) {
    this.channels = this.af.list('/channels');
    this.getAllChannels();
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

  getChannelList() {
    return this.allChannels;
  }

  private getAllChannels() {
    this.channels.subscribe(channels => {
      this.allChannels = channels;
    });
  }

  getMessages(channel_id) {
    return this.af.list(`chat/${channel_id}`);
  }

  sendMessage(channel_id, message) {
    return this.af.list(`chat/${channel_id}`).push(message);
  }

  getLastMessage(cid) {
    return this.af.list(`chat/${cid}`, {
      query: {
          limitToLast: 1
      }
    });
  }
}
