import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }
    create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    all(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id:number): Promise<User> {
       return this.userRepository.findOne({id});
    }
    delete(id:number){
        return this.userRepository.delete({id});
    }
    async update(id:number,data): Promise<User> {
        await this.userRepository.update(id, data);
        return this.userRepository.findOne({id});
    }
}
