import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {PostService} from "./post.service";
import {JwtService} from "@nestjs/jwt";
import {CreatePostDto} from "./create-post.dto";
import {Request} from "express";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService,
        private jwtService: JwtService
    ) {

    }

    @Post()
    async create(@Body() data: CreatePostDto,
           @Req() req: Request) {
        const jwt = req.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.postService.create({
            content: data.content,
            user: {
                id: user.id
            }
        });
    }

    @Get()
    all() {
        return this.postService.all();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.postService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.postService.delete(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: CreatePostDto,
        @Req() req: Request
    ) {

        const jwt = req.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.postService.findOne(id);
        //preverim ce je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik');
        }

        return this.postService.update(id, data);
    }

}
