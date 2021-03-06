import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

function getMessage(exception: HttpException, status: number) {
  if (status === 4003) {
    return '权限不足';
  } else if (status === 400) {
    return exception.message.message || '';
  } else {
    return exception.message.message || '';
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      success: false,
      statusCode: status,
      error: exception.message.error,
      message: getMessage(exception, status),
      timestamp: Date.now(),
      path: request.url,
      method: request.method,
    });
  }
}
