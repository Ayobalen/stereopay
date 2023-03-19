import { Controller, Param, Get, Body, Post, Delete, Query, Patch } from '@nestjs/common';
import { setupMediaDto, updateMediaDto } from './dtos/media.dto';
import { MediaService } from './media.service';
import { musicSetupschema, updateMusicSchema } from './validation';
import { injectJoiSchema } from 'src/helpers';
import { paginationQuery } from 'src/interfaces';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async getAllMedia(@Query() query: paginationQuery) {
    const data = await this.mediaService.getAllMedia(query);
    return data;
  }

  @Get(':id')
  async getMedia(@Param('id') id: string) {
    const data = await this.mediaService.getMedia(id);
    return data;
  }

  @Get()
  async findByNameAndDescription(
    @Query('name') name: string,
    @Query('description') description: string,
  ) {
    return await this.mediaService.findByNameAndDescription(name, description);
  }

  @Post()
  async createMedia(
    @Body(injectJoiSchema(musicSetupschema))
    media: setupMediaDto,
  ) {
    const data = await this.mediaService.createMedia(media);
    return data;
  }

  @Patch(':id')
  async updateMedia(
    @Body(injectJoiSchema(updateMusicSchema))
    MediaDto: updateMediaDto,
    @Param('id') id: string,
  ) {
    return this.mediaService.updateMedia(id, MediaDto);
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string) {
    return this.mediaService.deleteMedia(id);
  }
}
