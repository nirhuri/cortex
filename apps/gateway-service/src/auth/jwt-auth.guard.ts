import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers["authorization"];
        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing Bearer token');
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}