import { AuthService } from './auth.service';
import { SignupUseCase } from '@auth/auth/use-cases/signup.use-case';
import { LoginUseCase } from '@auth/auth/use-cases/login.use-case';
import { SignupDto } from '@auth/auth/dto/signup.dto';
import { LoginDto } from '@auth/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@auth/auth/entities/user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let mockSignupUseCase: Partial<jest.Mocked<SignupUseCase>>;
    let mockLoginUseCase: Partial<jest.Mocked<LoginUseCase>>;
    let mockJwtService: Partial<jest.Mocked<JwtService>>;

    beforeEach(() => {
        mockSignupUseCase = {
            execute: jest.fn(),
        };
        mockLoginUseCase = {
            execute: jest.fn(),
        };
        mockJwtService = {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
        };

        service = new AuthService(
            mockSignupUseCase as unknown as SignupUseCase,
            mockLoginUseCase as unknown as LoginUseCase,
            mockJwtService as unknown as JwtService,
        );
    });

    it('should signup and return accessToken', async () => {
        const dto: SignupDto = {
            email: 'test@example.com',
            password: '123456',
            fullName: 'Test User',
        };
        const user = { id: 'u1', ...dto } as User;

        mockSignupUseCase.execute!.mockResolvedValueOnce(user);

        const result = await service.signup(dto);

        expect(mockSignupUseCase.execute).toHaveBeenCalledWith(dto);
        expect(mockJwtService.sign).toHaveBeenCalledWith({
            id: user.id,
            email: user.email,
        });
        expect(result).toEqual({ accessToken: 'mocked-jwt-token' });
    });

    it('should login and return accessToken', async () => {
        const dto: LoginDto = {
            email: 'test@example.com',
            password: '123456',
        };
        const user = { id: 'u1', email: dto.email, password: 'hashed', fullName: 'User' } as User;

        mockLoginUseCase.execute!.mockResolvedValueOnce(user);

        const result = await service.login(dto);

        expect(mockLoginUseCase.execute).toHaveBeenCalledWith(dto);
        expect(mockJwtService.sign).toHaveBeenCalledWith({
            id: user.id,
            email: user.email,
        });
        expect(result).toEqual({ accessToken: 'mocked-jwt-token' });
    });
});