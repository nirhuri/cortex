import { LoginUseCase } from './login.use-case';
import { User } from '@auth/auth/entities/user.entity';
import { IPasswordService } from '../interfaces/password-service.interface';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('LoginUseCase', () => {
    let useCase: LoginUseCase;
    let mockUserRepository: Partial<jest.Mocked<Repository<User>>>;
    let mockPasswordService: jest.Mocked<IPasswordService>;
    let mockJwtService: jest.Mocked<JwtService>;

    const fakeUser = (overrides: Partial<User> = {}): User =>
    ({
        id: 'user-id',
        email: 'user@example.com',
        password: 'hashed-password',
        fullName: 'Mock User',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    } as unknown as User);

    beforeEach(() => {
        mockUserRepository = {
            findOneBy: jest.fn(),
        };

        mockPasswordService = {
            hashPassword: jest.fn(),
            compare: jest.fn(),
        };

        mockJwtService = {
            sign: jest.fn(),
        } as unknown as jest.Mocked<JwtService>;

        useCase = new LoginUseCase(
            mockUserRepository as Repository<User>,
            mockPasswordService
        );
    });

    it('should return the user if credentials are valid', async () => {
        const dto: LoginDto = {
            email: 'user@example.com',
            password: 'correct-password',
        };

        const user = fakeUser();
        mockUserRepository.findOneBy!.mockResolvedValueOnce(user);
        mockPasswordService.compare.mockResolvedValueOnce(true);

        const result = await useCase.execute(dto);

        expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email: dto.email });
        expect(mockPasswordService.compare).toHaveBeenCalledWith(dto.password, user.password);
        expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if user not found', async () => {
        mockUserRepository.findOneBy!.mockResolvedValueOnce(null);

        await expect(
            useCase.execute({ email: 'wrong@example.com', password: 'irrelevant' }),
        ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
        mockUserRepository.findOneBy!.mockResolvedValueOnce(fakeUser());
        mockPasswordService.compare.mockResolvedValueOnce(false);

        await expect(
            useCase.execute({ email: 'user@example.com', password: 'wrong-password' }),
        ).rejects.toThrow(UnauthorizedException);
    });
});