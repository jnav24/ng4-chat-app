import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UsersService} from "../common/services/users.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() user;
  @Output() openProfile: EventEmitter<any> = new EventEmitter();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.user = this.usersService.getUserImage(this.user);
  }

  isUserImageAvailable() {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return this.user.image != '' && this.user.image != null && urlregex.test(this.user.image);
  }

  showProfile() {
    this.openProfile.emit();
  }
}
