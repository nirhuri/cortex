import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { User } from "./entities/user.entity";
import { SignupUseCase } from "./use-cases/signup.use-case";
import { PasswordService } from "./services/password.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginUseCase } from "./use-cases/login.use-case";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { PASSWORD_SERVICE } from "./auth.constants";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get('JWT_SECRET'),
      signOptions: {
        expiresIn: config.get('JWT_EXPIRATION') ?? '1h',
      },
    }),
  }),
  ],
  exports: [SignupUseCase],
  providers: [
    AuthService,
    SignupUseCase,
    LoginUseCase,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordService
    }
  ],
  controllers: [AuthController],
})
export class AuthModule { }