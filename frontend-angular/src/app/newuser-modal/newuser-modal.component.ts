import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../users/users.service';
import {UsersComponent} from '../users/users.component';

@Component({
  selector: 'app-newuser-modal',
  templateUrl: './newuser-modal.component.html',
  styleUrls: ['./newuser-modal.component.css']
})

export class NewuserModalComponent extends UsersComponent  implements OnInit {

  constructor(protected usersService: UsersService) {
    super(usersService);
  }
  addUserForm = new FormGroup({
    n: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    e: new FormControl('',
      [Validators.required, Validators.email]),
    i: new FormControl(),
  })

  ngOnInit() {

  }

  hideadd() {
    $('#addUserModal').hide();
  }
  onSubmit() {
   this.addUser(this.addUserForm);

  }

}
