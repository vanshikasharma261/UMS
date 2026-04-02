import {
    IsEmail,
    IsEnum,
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
} from 'class-validator';
import { Role } from 'generated/prisma/enums';


export class CreateUserDto {

    @IsString()
    @MinLength(2, { message: 'First name must be at least 2 characters' })
    @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
    firstName: string;

    @IsString()
    @MinLength(2, { message: 'Last name must be at least 2 characters' })
    @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
    lastName: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(32, { message: 'Password cannot exceed 32 characters' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        { message: 'Password must contain uppercase, lowercase, number and special character' }
    )
    password: string;

    @IsString()
    gender: string;

    @IsEnum(Role, { message: 'Role must be ADMIN or USER' })
    @IsOptional()
    role?: Role;   // optional — defaults to USER via Prisma schema

    @IsString()
    street: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsString()
    @Matches(/^\d{5,10}$/, { message: 'Zip code must be 5 to 10 digits' })
    zipCode: string;
}