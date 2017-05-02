import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Contacts';
  items: FirebaseListObservable<any>;

  	constructor(public af: AngularFire) {
	    this.items = af.database.list('/users');
	}
}
