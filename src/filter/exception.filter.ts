import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();


        response.status(exception.getStatus()).json({
            statusCode: exception.getStatus(),
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
            error: exception.response.message,
            occuredAt: new Date().toISOString()
        })
    }
}