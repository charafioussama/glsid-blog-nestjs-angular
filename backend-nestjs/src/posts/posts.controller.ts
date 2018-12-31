import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { PostsService } from './posts.service';
import {CreatePostDto} from './create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAll();
  }
    @Get(':postId')
    getOnePost(@Param('postId') postId) {
        const post= this.postsService.getPostById(postId);
        if(!post){
            throw new HttpException('Not found' , HttpStatus.NOT_FOUND);
        }
        return post;
    }
    @Post()
    createPost(@Body() createPostDto : CreatePostDto ){
        return this.postsService.createPost(createPostDto);
    }

    @Put('postId')
    update(@Param('postId') postId,@Body() postDto : CreatePostDto){
        return this.postsService.updatePost(postId, postDto);
    }

}
