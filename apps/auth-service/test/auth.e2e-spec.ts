import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/auth/signup (POST) - should return 201', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email: 'test@example.com',
                password: '123456',
                fullName: 'Test User',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('accessToken');
    });
});