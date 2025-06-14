import { JwtStrategy } from './jwt.strategy';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

describe('JwtStrategy', () => {
    it('should validate payload correctly', async () => {
        const strategy = new JwtStrategy({ get: () => 'secret' } as any);
        const payload = { id: '123', email: 'test@example.com' };

        const result = await strategy.validate(payload);
        expect(result).toEqual(payload);
    });
});