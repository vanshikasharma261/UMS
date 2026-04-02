import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'generated/prisma/enums';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Step 1 — read what roles are required for this route
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        // Step 2 — if no @Roles() decorator, route is open to all authenticated users
        if (!requiredRoles) {
            return true;
        }

        // Step 3 — get request.user (attached by JwtAuthGuard)
        const { user } = context.switchToHttp().getRequest();

        // Step 4 — check if user's role is in the required roles
        return requiredRoles.includes(user.role);
    }
}