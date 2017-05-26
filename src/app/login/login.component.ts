import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  labelIsSelected: boolean[] = [
    false,
    false
  ];

	constructor() { }

	ngOnInit() {
	}

	logUserIn() {
  }

  logUserOut() {
  }

  selectLabel(index: number) {
    this.labelIsSelected[index] = true;
  }
}
