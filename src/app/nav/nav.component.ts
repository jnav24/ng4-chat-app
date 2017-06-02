import {Component, OnInit, Input} from '@angular/core';
import {Users} from "../common/models/users.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() user: Users[];

  constructor() { }

  ngOnInit() {
  }

}
