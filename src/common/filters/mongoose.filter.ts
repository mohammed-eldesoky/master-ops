import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Error as MongooseError, mongo } from 'mongoose';

@Catch()
export class MongooseFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    //get context
    const ctx = host.switchToHttp();
    //get response
    const response = ctx.getResponse();
    //1- if it's already an HttpException, just pass it through
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json(res);
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: { field: any; message: string }[] = [];

    //2-handle mongoose validation error
    if (exception instanceof MongooseError.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation Failed';
      errors = Object.values(exception.errors).map((err: any) => ({
        field: err,
        message: exception.errors[err].message,
      }));
    }
    //3- invalid ObjectId error
    else if (exception instanceof MongooseError.CastError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Invalid value for ${exception.path}: ${exception.value}`;
    }
    //4- duplicate key error
    else if (
      exception instanceof mongo.MongoServerError &&
      exception.code === 11000
    ) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate key error';
      const field = Object.keys(exception.keyValue)[0];
      errors = [
        {
          field,
          message: `${field} "${exception.keyValue[field]}" already exists`,
        },
      ];
    }

    //  5. Other known Mongoose errors
    else if (exception instanceof MongooseError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    //  6. Unknown errors
    else {
      console.error('Unknown Error:', exception);
      message = exception.message || message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      errors,
    });
  }
}
