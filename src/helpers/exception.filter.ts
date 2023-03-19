import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from 'src/interfaces';

// Exception filter for all modules
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const data: IResponse = {
      status: 'fail',
      message: exception.message,
      error: {
        name: exception.name,
      },
    };

    response.status(status).json(data);
  }
}
