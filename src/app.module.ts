import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { TouristZoneModule } from './modules';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filter';
import { LogginInterceptor } from './interceptors';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
TouristZoneModule],
providers: [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LogginInterceptor
  }
]
})
export class AppModule {}
