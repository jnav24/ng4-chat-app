import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLogin: boolean;
  reg_first_name: string;
  reg_last_name: string;
  reg_email: string;
  reg_pass: string;
  reg_confirm_pass: string;
  url: any;

  constructor(private route: ActivatedRoute, private signInService: SignInService) { }

  ngOnInit() {
    this.url = this.route.snapshot.url;
    this.isLogin = (!this.url.length || this.url[0].path === 'login');
    // this.signInService.getAllItems().do(console.log).subscribe(items => this.items = items);
  }

  registerUser() {
    this.signInService.createNewUser(this.reg_email, this.reg_pass);
  }
}
