import {BadRequestException, Body, Controller, NotFoundException, Post, Res} from '@nestjs/common';
import {LoginDto} from "./login.dto";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { Response } from 'express';
import {RegisterDto} from "../user/register.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService){
    }


    @Post('login')
    async login(
        @Body() data:LoginDto,
        @Res({passthrough: true}) response: Response) {
        const user = await this.userService.findOneByEmail(data.email);

        if(!user) {
            throw new NotFoundException('Email ne obstaja');
        }

        if(!await bcrypt.compare(data.password, user.password)) {
            throw new BadRequestException('Geslo ni pravilno');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});
    }

    @Post('register')
    async register(@Body() data:RegisterDto) {
        if(data.password !== data.password_confirm) {
            throw new BadRequestException('Gesli se ne ujemata');
        }
        const hashed = await bcrypt.hash(data.password, 12);
        return this.userService.create({
            "first_name":data.first_name,
            "last_name":data.last_name,
            "email":data.email,
            "password":hashed
        });
    }

    @Post('logout')
    logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: "Odjavljeni"
        }
    }
}
