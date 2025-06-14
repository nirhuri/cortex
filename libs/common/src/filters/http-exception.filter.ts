import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error';

        this.logger.error(
            `HTTP ${request.method} ${request.url} failed: ${JSON.stringify(message)}`,
        );

        if (!(exception instanceof HttpException)) {
            this.logger.error('Unexpected error:', (exception as any).stack || exception);
        }

        response.status(status).json({
            success: false,
            message,
        });
    }
}