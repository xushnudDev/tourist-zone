import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { TouristZoneModule } from './modules';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
TouristZoneModule
],
})
export class AppModule {}
