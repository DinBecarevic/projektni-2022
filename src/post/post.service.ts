import { Injectable } from '@nestjs/common';
import {Post} from "./post.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>
    ) {
    }

    create(data): Promise<Post> {
        return this.postRepository.save(data);
    }

    all(): Promise<Post[]> {
        return this.postRepository.find();
    }
    findOne(id): Promise<Post> {
        return this.postRepository.findOne({id});
    }
    delete(id:number){
        return this.postRepository.delete({id});
    }
    async update(id:number,data): Promise<Post> {
        await this.postRepository.update(id, data);
        return this.postRepository.findOne({id});
    }
}
