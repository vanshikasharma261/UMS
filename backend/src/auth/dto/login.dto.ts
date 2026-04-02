import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Provide a valid email' })
    email: string;
    @IsString()
    @MinLength(8, { message: "Password should have minimum 8 characters" })
    password: string;
}