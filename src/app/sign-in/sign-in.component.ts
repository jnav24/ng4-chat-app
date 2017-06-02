import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SignInService } from './sign-in.service';
import { Users } from '../common/models/users.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  error: string = '';
  isLogin: boolean;
  log_in: FormGroup;
  sign_up: FormGroup;
  url: any;

  constructor(private route: ActivatedRoute, private signInService: SignInService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.log_in = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
        password: ['', [Validators.required]]
    });

    this.sign_up = this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3)]],
        last_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
        confirm_password: ['', [Validators.required]],
    });

    this.url = this.route.snapshot.url;
    this.isLogin = (!this.url.length || this.url[0].path === 'login');
    this.signInService.user.subscribe(user => {
        this.redirectUser(user);
    });
  }

  registerUser() {
      const email = this.sign_up.value.email;
      const password = this.sign_up.value.password;

    this.signInService.createNewUser(email, password)
        .then(auth => {
          this.signInService.addUser(new Users(auth.uid, email, this.sign_up.value.first_name, this.sign_up.value.last_name));
            this.redirectUser(auth);
        })
        .catch(error => {
          this.error = error.message;
        });
  }

  login() {
    this.signInService.loginUser(this.log_in.value.email, this.log_in.value.password)
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
