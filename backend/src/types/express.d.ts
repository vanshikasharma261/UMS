// express.d.ts
import { Role } from 'generated/prisma/enums';

declare global {
    namespace Express {
        interface User {
            id: string;
            email: string;
            role: Role;
        }
    }
}