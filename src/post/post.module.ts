import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {CommonModule} from "../common/common.module";
import {Post} from "./post.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommonModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
