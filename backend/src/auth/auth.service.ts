import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private jwt: JwtService
    ) { }
    async login(dto: LoginDto) {
        let user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        let passwordMatch = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        let token = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role
        });
        return { access_token: token };
    }
}
