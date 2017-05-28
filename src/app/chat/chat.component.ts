import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "./chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.chatService.user.do(console.log).subscribe(user => {
      if (user === null || typeof user.uid === 'undefined') {
        this.router.navigate(['login']);
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
}
