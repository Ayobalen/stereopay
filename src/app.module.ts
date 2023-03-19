import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './api/media/media.module';
import { NODE_ENV } from './constants';
//import { dataSourceOptions } from 'db/data-source';
import { Media } from './api/media/schema/index.entity';

@Module({
  imports: [
    MediaModule,
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === NODE_ENV.PROD
          ? '.prod.env'
          : process.env.NODE_ENV === NODE_ENV.STAGING
          ? '.staging.env'
          : '.dev.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'stereopay',
      entities: [Media],
      autoLoadEntities: true,
      migrations: ['dist/db/migrations/*.js'],
      synchronize: false,
    }),
  ],
})
export class AppModule {}
