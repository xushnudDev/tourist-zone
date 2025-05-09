import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable,tap } from "rxjs";

@Injectable()
export class LogginInterceptor implements NestInterceptor {
    intercept(constext: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now = Date.now();
        return next.handle().pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`))
        );
    }
}