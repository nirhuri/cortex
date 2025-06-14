import { Injectable } from '@nestjs/common';
import { SignupUseCase } from '@auth/auth/use-cases/signup.use-case';
import { LoginUseCase } from '@auth/auth/use-cases/login.use-case';
import { SignupDto } from '@auth/auth/dto/signup.dto';
import { LoginDto } from '@auth/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly jwtService: JwtService,
  ) { }

  async signup(dto: SignupDto): Promise<{ accessToken: string; }> {
    const user = await this.signupUseCase.execute(dto);
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { accessToken: token };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; }> {
    const user = await this.loginUseCase.execute(dto);
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { accessToken: token };
  }
}