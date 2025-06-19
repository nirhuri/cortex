import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined and extend AuthGuard("jwt")', () => {
    const guard = new JwtAuthGuard();
    expect(guard).toBeDefined();
  });
});
