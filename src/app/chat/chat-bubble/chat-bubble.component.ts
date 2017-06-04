import {Component, OnInit, Input} from '@angular/core';
import {Messages} from "../../common/models/messages.model";

@Component({
  selector: 'chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() user;
  @Input() message: Messages;

  constructor() { }

  ngOnInit() {
  }

}
