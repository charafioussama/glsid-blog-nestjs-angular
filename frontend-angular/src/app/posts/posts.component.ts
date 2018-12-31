import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UsersService} from '../users/users.service';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: any[];
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    console.log("ngOnInit");
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getPosts();
  }

  private getPosts() {
    this.postsService.getPosts()
      .subscribe(posts => {
        this.posts = posts;
        this.dtTrigger.next();
      });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



}
