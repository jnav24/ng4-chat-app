import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';

@Component({
  	selector: 'app-register',
  	templateUrl: './register.component.html',
  	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	auth = null;
	email = '';
	pass = '';
  	title = 'Contacts';
  	// items: FirebaseListObservable<any>;
  	// user: FirebaseObjectObservable<any>;

  	constructor() {
  		// this.auth = firebase.auth();
	   //  this.items = af.database.list('/items');
	   //  this.af.auth.subscribe(user => {
	   //  	if (user) {
	   //  		// user.uid
	   //  		this.user = af.database.object('users/' + user.uid);
	   //  	} 
	   //  });
	}

  	ngOnInit() {
  	}

  	createNewUser() {
		// firebase, not angularfire2
		// const promise = this.auth.createUserWithEmailAndPassword(this.email, this.pass);
		// promise.catch(e => {
		// 	console.log(e.message);
		// });
	}
}
