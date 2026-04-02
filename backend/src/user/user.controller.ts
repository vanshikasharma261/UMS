import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'generated/prisma/enums';
import { Roles } from 'src/auth/decorators/roles.decorator';

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
    @Get(':id')
    getUser(@Param('id') id: string) {
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
