import { PASSWORD_SERVICE } from "@auth/auth/auth.constants";
import { SignupDto } from "@auth/auth/dto/signup.dto";
import { User } from "@auth/auth/entities/user.entity";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class SignupUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(PASSWORD_SERVICE)
        private readonly passwordService: { hashPassword: (password: string) => Promise<string>; }
    ) { }

    async execute(dto: SignupDto): Promise<User> {
        const existingUser = await this.userRepository.findOneBy({ email: dto.email });
        if (existingUser) {
            throw new ConflictException("User already exists with this email");
        }

        const hashedPassword = await this.passwordService.hashPassword(dto.password);
        const user = this.userRepository.create({
            email: dto.email,
            password: hashedPassword,
            fullName: dto.fullName,
        });
        return await this.userRepository.save(user);
    }
}