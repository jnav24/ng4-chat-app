import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { SignInService } from './sign-in.service';
import { Users } from '../common/models/users.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  error: string = '';
  isLogin: boolean;
  log_email: string;
  log_pass: string;
  reg_first_name: string;
  reg_last_name: string;
  reg_email: string;
  reg_pass: string;
  reg_confirm_pass: string;
  url: any;

  constructor(private route: ActivatedRoute, private signInService: SignInService, private router: Router) { }

  ngOnInit() {
    this.url = this.route.snapshot.url;
    this.isLogin = (!this.url.length || this.url[0].path === 'login');
    // this.signInService.getAllItems().do(console.log).subscribe(items => this.items = items);
    this.signInService.user.subscribe(user => {
        this.redirectUser(user);
    });
  }

  registerUser() {
    this.signInService.createNewUser(this.reg_email, this.reg_pass)
        .then(auth => {
          this.signInService.addUser(new Users(this.reg_email, this.reg_first_name, this.reg_last_name));
            this.redirectUser(auth);
        })
        .catch(error => {
          this.error = error.message;
        });
  }

  login() {
    this.signInService.loginUser(this.log_email, this.log_pass)
        .then(auth => {
            this.redirectUser(auth);
        })
        .catch(error => {
          this.error = error.message;
        });
  }

  private redirectUser(user) {
      if (user !== null && typeof user.uid !== 'undefined') {
          this.router.navigate(['chat', user.uid]);
      }
  }
}
