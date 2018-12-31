import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { UsersService } from '../users/users.service';
import {CreatePostDto} from './create-post.dto';

@Injectable()
export class PostsService {
  private readonly posts: any[];
  constructor(private usersService: UsersService) {
    this.posts = new Array(200)
      .fill(1)
      .map(e => {
        return {
          title: faker.lorem.sentence(),
          image: faker.image.avatar(),
          body: faker.lorem.word(),
          userId: this.getUserId(),
          postedAt: faker.date.past(),
        };
      }).sort((e1, e2) => {
        if (e1.postedAt > e2.postedAt) {
          return 1;
        } else if (e1.postedAt === e2.postedAt) {
          return 0;
        } else { return -1}
    }).map((e,i) => {
      e['postId'] = i + 1;
      return e;
      });
  }
  getAll() {
    return this.posts;
  }
  private getUserId() {
     const users = this.usersService.getAll();
     const index = Math.floor(Math.random() * users.length);
     return users[index].name;
  }
    getPostById(postId){
        return this.posts.find(e => e.postId==Number(postId));
    }
    getUserById(userId){
        return this.posts.find(e => e.userId==Number(userId));
    }
    createPost(postDto:CreatePostDto){
        const post={
            postId : this.generateId(),
            title : postDto.title,
            body : postDto.body,
            postedAt : new Date(),
        };
        this.posts.push(post);
        return post;
    }
    updatePost(id,postDto: CreatePostDto){
        const post=this.posts.find(e=>e.id==Number(id));
        post.title=postDto.title;
        post.body=postDto.body;
        return post;
    }
    removePost(id){
        const postIndex= this.posts.findIndex(e=>e.id == Number( id));
        if(postIndex>-1){
            this.posts.splice(postIndex,1);
            return this.posts[postIndex];
        }
        return null;
    }
    private generateId() {
        return this.posts.length > 0 ?
            Math.max(...this.posts.map(e => e.id)) + 1 :
            1;
    }

}
