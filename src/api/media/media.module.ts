import { Module } from '@nestjs/common';
import { MediaProvider } from './media.provider';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './schema/index.entity';
import { UtilService } from 'src/helpers';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaProvider, MediaService, UtilService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
