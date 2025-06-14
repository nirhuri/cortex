import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService implements PasswordService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async compare(raw: string, hash: string): Promise<boolean> {
        return bcrypt.compare(raw, hash);
    }
}