import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser, extractUserFromContext } from './current-user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

describe('@CurrentUser', () => {
    it('should extract user from ExecutionContext', () => {
        const mockUser = { id: '123', email: 'test@example.com' };

        const mockCtx = {
            switchToHttp: () => ({
                getRequest: () => ({ user: mockUser }),
            }),
        } as unknown as ExecutionContext;

        const result = extractUserFromContext(null, mockCtx);
        expect(result).toEqual(mockUser);
    });
});