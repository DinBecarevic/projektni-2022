import {IsEmail, IsOptional, MinLength} from "class-validator";

export class UserUpdateDto {

    first_name?: string;

    last_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(4)
    password?: string;
}