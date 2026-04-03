import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'generated/prisma/enums';
import { Roles } from 'src/auth/decorators/roles.decorator';
import type { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userservice: UserService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    getUsers() {
        return this.userservice.getUsers();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @Get('getme')
    getMe(@Req() req: Request) {
        if (!req.user) {
            throw new UnauthorizedException('Login First');
        }
        console.log("Requested user is: ", req.user);

        const user = req.user;
        console.log("type of user is: ", typeof user);
        console.log("user is :", user);
        return this.userservice.getMe({ id: user.id, email: user.email, role: user.role });

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get(':id')
    getUser(@Param('id') id: string, @Req() req: Request) {
        console.log("Requested User is: ", req.user);
        return this.userservice.getUser(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    createUser(@Body() body: CreateUserDto) {
        console.log("Body in create is: ", body);
        return this.userservice.createUser(body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        console.log("Body in update is: ", body);
        return this.userservice.updateUser(id, body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userservice.deleteUser(id);
    }
}
