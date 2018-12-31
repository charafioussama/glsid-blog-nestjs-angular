import { Component, OnDestroy, OnInit } from '@angular/core';
import {UsersService} from './users.service';
import {Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnDestroy, OnInit {
  users: any[];
  userID: number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(protected usersService: UsersService) {}

  updateForm = new FormGroup({
    n: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    e: new FormControl('',
      [Validators.required, Validators.email]),
    i: new FormControl(),
  });

  ngOnInit() {

    console.log("ngOnInit");
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getUsers();
  }

   private getUsers() {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.dtTrigger.next();
      });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  protected addUser(addUserForm) {
    this.usersService.addUser(addUserForm.value).subscribe(
      data => {
        //this.getUsers()
        return true;
      },
      error => {
        console.error("Error saving food!");
        return Observable.throw(error);
      }
    );
  }
  protected updateUser(updateForm,id) {
    this.usersService.updateUser(updateForm.value, id).subscribe(
      data => {
        console.log(data);
        return data;
      },
      error => {
        console.error("Error saving food!");
        return Observable.throw(error);
      }
    );
  }

  hideDel() {
    $('#delModal').hide();
  }

  hideUp() {
    $('#modModal').hide();
  }
  deleteRow(): void {
    $('#delModal').hide();
    this.usersService.deleteUser(this.userID).subscribe((data)=>{
      console.log("success"+data.id);
    });
  }


  deleteCpy(id) {
    this.userID = id;
    console.log("Id : " + id);
    $('#delModal').show();
  }

  updateCpy(user) {
    this.userID = user.id;
    console.log("modId : " +user.id);

    this.updateForm.patchValue({
      n: user.name,
    });
    this.updateForm.patchValue({
      e: user.email,
    });
    $('#modModal').show();
  }
  onSubmitUp() {
    this.updateUser(this.updateForm,this.userID);
    $('#modModal').hide();

  }

}
