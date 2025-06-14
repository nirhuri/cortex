import { Body, Controller, UseGuards, Get, Post, Logger } from "@nestjs/common";
import { AuthService } from "@auth/auth/services/auth.service";
import { SignupDto } from "@auth/auth/dto/signup.dto";
import { LoginDto } from "@auth/auth/dto/login.dto";
import { JwtAuthGuard } from '@auth/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@auth/auth/decorators/current-user.decorator';
import { UserResponseDto } from '@auth/auth/dto/user-response.dto';
import { JwtPayload } from '@auth/auth/interfaces/jwt-payload.interface';

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) { }

  @Post("signup")
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string; }> {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: JwtPayload): UserResponseDto {
    this.logger.debug(`User retrieved from JWT: ${JSON.stringify(user)}`);
    return user;
  }
}