import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {UsersService} from './users.service';
import { DataTablesModule } from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [UsersService]
})
export class UsersModule { }
