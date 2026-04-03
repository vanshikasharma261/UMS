import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { hash } from 'crypto';
import { Role, User } from 'generated/prisma/client';

function sanitizeUser(user: User) {
    const { password, isDeleted, ...rest } = user;
    return rest;
}

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUsers() {
        const users = await this.prisma.user.findMany({
            where: { isDeleted: false }
        });
        console.log("Type of users is: ", typeof users);
        console.log("Here are the users: ", users);
        return users;
    }
    async getUser(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id, isDeleted: false
            }
        });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        console.log("Type of user is: ", typeof user);
        console.log("Here is the user: ", user);
        return sanitizeUser(user);
    }
    async getMe(user: { id: string, email: string, role: Role }) {
        const data = await this.prisma.user.findUnique({
            where: { id: user.id }
        });
        if (!user) {
            throw new NotFoundException('User Not Found!');
        }
        return sanitizeUser(data!);
    }
    async createUser(data: CreateUserDto) {
        const find = await this.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (find) {
            throw new ConflictException('email already in use');
        }
        const hashpassword = await bcrypt.hash(data.password, 10);
        const res = await this.prisma.user.create({
            data: {
                ...data,
                password: hashpassword,
            },
        });
        console.log("type of res in create is: ", typeof res);
        console.log("Response of create is: ", res);
        return sanitizeUser(res);
    }
    async updateUser(id: string, data: UpdateUserDto) {
        let user = this.getUser(id);
        if (!user) {
            throw new NotFoundException("User does not exists")
        }
        if (data.email) {
            let find = await this.prisma.user.findFirst({
                where: { email: data.email, NOT: { id } }
            });
            if (find) {
                throw new ConflictException('Email in use');
            }

        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const res = await this.prisma.user.update({
            where: { id },
            data: data
        });
        console.log("type of response in update is: ", typeof res);
        console.log("Response of update is: ", res);
        return sanitizeUser(res);
    }
    async deleteUser(id: string) {
        let user = this.getUser(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const res = await this.prisma.user.update({
            where: { id },
            data: { isDeleted: true }
        });
        console.log("Response type of delete is: ", typeof res);
        console.log("Repsonse of delete is: ", res);
        return sanitizeUser(res);
    }
}
