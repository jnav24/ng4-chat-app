import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  @Input() user;
  @Input() setProfileWindow;
  @Output() resetProfile: EventEmitter<any> = new EventEmitter();
  profileNotChanged: boolean;

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.usersService.getUserImage(this.user);
    this.editForm = this.fb.group({
      first_name: [this.user.first_name, [Validators.required, Validators.minLength(3)]],
      last_name: [this.user.last_name, [Validators.required, Validators.minLength(3)]],
      email: [{value: this.user.email, disabled: true}, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      image: [this.user.image, []],
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
    let updated = {};

    Object.keys(this.editForm.value).forEach(key => {
      if (this.user[key] !== this.editForm.value[key]) {
        updated[key] = this.editForm.value[key];
      }
    });

    this.usersService.updateUserProfile(this.user.$key, updated);
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

  isUserImageAvailable() {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return this.user.image != '' && this.user.image != null && urlregex.test(this.user.image);
  }

  openProfile() {
    return typeof this.setProfileWindow !== 'undefined' && this.setProfileWindow;
  }

  closeProfile() {
    this.setProfileWindow = false;
    this.resetProfile.emit();
  }
}
