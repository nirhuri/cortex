import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET') || 'test-secret';

        super({
            jwtFromRequest: (req: Request) => req.cookies?.accessToken,
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: { id: string; email: string; }) {
        this.logger.debug('Validating JWT payload...');
        this.logger.verbose(`Payload: ${JSON.stringify(payload)}`);
        return { id: payload.id, email: payload.email };
    }
}