import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}

// to catch everything

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//     constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

//     catch(exception: unknown, host: ArgumentsHost): void {
//         // In certain situations `httpAdapter` might not be available in the
//         // constructor method, thus we should resolve it here.
//         const { httpAdapter } = this.httpAdapterHost;

//         const ctx = host.switchToHttp();

//         const httpStatus =
//             exception instanceof HttpException
//                 ? exception.getStatus()
//                 : HttpStatus.INTERNAL_SERVER_ERROR;

//         const responseBody = {
//             statusCode: httpStatus,
//             timestamp: new Date().toISOString(),
//             path: httpAdapter.getRequestUrl(ctx.getRequest()),
//         };

//         httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
//     }
// }