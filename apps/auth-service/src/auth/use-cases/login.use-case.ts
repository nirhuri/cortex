import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { PASSWORD_SERVICE } from '@auth/auth/auth.constants';
import { IPasswordService } from '../interfaces/password-service.interface';

@Injectable()
export class LoginUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(PASSWORD_SERVICE)
        private readonly passwordService: IPasswordService,
    ) { }

    async execute(dto: LoginDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: dto.email });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await this.passwordService.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return user;
    }
}