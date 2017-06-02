import { Component, OnInit, Input } from '@angular/core';
import { Users } from "../common/models/users.model";
import { UsersService } from "../common/services/users.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editMode: boolean = false;
  editForm: FormGroup;
  @Input() user: Users;
  profileNotChanged: boolean;

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.usersService.getUserImage(this.user);
    this.editForm = this.fb.group({
      first_name: [this.user.first_name, [Validators.required, Validators.minLength(3)]],
      last_name: [this.user.last_name, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
    });
  }

  toggleEditMode() {
    this.editMode = ! this.editMode;
  }

  editProfile() {
    this.detectChangesInProfileForm();
    this.toggleEditMode();
  }

  updateProfile() {
    this.toggleEditMode();
  }

  detectChangesInProfileForm() {
    this.profileNotChanged = true;

    Object.keys(this.editForm.value).forEach(key => {
      if (this.user[key] !== this.editForm.value[key]) {
        this.profileNotChanged = false;
        return;
      }
    });
  }
}
