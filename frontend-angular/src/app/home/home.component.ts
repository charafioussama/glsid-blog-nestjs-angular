import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users/users.service';
import {PostsService} from '../posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nbUsers:any;
  nbPosts:any;

  constructor(private usersService: UsersService, private postsService: PostsService) { }

  ngOnInit() {
    this.getUsers();
    this.getPosts();
  }

  getUsers(){
    this.usersService.getUsers().subscribe(data => (this.nbUsers = data.length));
  }
  getPosts(){
    this.postsService.getPosts().subscribe(data => (this.nbPosts = data.length));
  }

}
