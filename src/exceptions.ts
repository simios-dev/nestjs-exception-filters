import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class SimiosHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      console.log('simios');
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      const status = exception.getStatus();

      response.status(status).json({
        success: false,
        statusCode: status,
        errorMessage: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
