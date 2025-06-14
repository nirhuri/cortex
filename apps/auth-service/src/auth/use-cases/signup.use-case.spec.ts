import { SignupUseCase } from './signup.use-case';
import { User } from '../entities/user.entity';
import { IPasswordService } from '../interfaces/password-service.interface';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('SignupUseCase', () => {
    let useCase: SignupUseCase;
    let mockPasswordService: jest.Mocked<IPasswordService>;
    let mockUserRepository: Partial<jest.Mocked<Repository<User>>>;

    const fakeUser = (overrides: Record<string, any> = {}): User =>
    ({
        id: 'mock-id',
        email: 'mock@email.com',
        password: 'hashed',
        fullName: 'Mock User',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    } as unknown as User);

    beforeEach(() => {
        mockPasswordService = {
            hashPassword: jest.fn(),
            compare: jest.fn(),
        };

        mockUserRepository = {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        };

        useCase = new SignupUseCase(
            mockUserRepository as Repository<User>,
            mockPasswordService,
        );
    });

    it('should throw ConflictException if user already exists', async () => {
        mockUserRepository.findOneBy!.mockResolvedValueOnce(fakeUser({ id: 'existing' }));

        await expect(
            useCase.execute({
                email: 'user@example.com',
                password: '123456',
                fullName: 'Duplicate User',
            }),
        ).rejects.toThrow(ConflictException);
    });

    it('should hash password and save new user', async () => {
        mockUserRepository.findOneBy!.mockResolvedValueOnce(null);
        mockPasswordService.hashPassword.mockResolvedValue('securehash');

        const expectedUser = fakeUser({
            email: 'new@example.com',
            password: 'securehash',
            fullName: 'New User',
        });

        mockUserRepository.create!.mockReturnValue(expectedUser);
        mockUserRepository.save!.mockResolvedValue(expectedUser);

        const result = await useCase.execute({
            email: 'new@example.com',
            password: 'plainpass',
            fullName: 'New User',
        });

        expect(mockPasswordService.hashPassword).toHaveBeenCalledWith('plainpass');
        expect(mockUserRepository.create).toHaveBeenCalledWith({
            email: 'new@example.com',
            password: 'securehash',
            fullName: 'New User',
        });
        expect(result).toEqual(expectedUser);
    });
});