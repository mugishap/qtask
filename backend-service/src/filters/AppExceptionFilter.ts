import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import ServerResponse from 'src/utils/ServerResponse';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        if (status === 400) {
            if (exception.getResponse() instanceof Object) {
                return response.status(status).json(ServerResponse.error(exception.getResponse()['message'][0]));
            } else if (exception.getResponse() instanceof String) {
                return response.status(status).json(ServerResponse.error(exception.getResponse().toString()));
            }
            return response.status(status).json(
                ServerResponse.error(exception.getResponse().toString(), exception.getResponse())
            )
        }
        else if (status === 401) {
            response.status(status).json(ServerResponse.error( exception.getResponse()['message'], exception.getResponse()));
        }
        else if (status === 404) {
            response.status(status).json(ServerResponse.error( exception.getResponse()['message'], exception.getResponse()));
        }
        else if (status === 403) {
            response.status(status).json(ServerResponse.error("Forbidden", exception.getResponse()));
        }
        else {
            console.log(exception);
            response.status(status).json(ServerResponse.error("Error occured", exception));
        }
    }
}