import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './schema/index.entity';
import { IResponse } from 'src/interfaces';
import { updateMediaDto, setupMediaDto } from './dtos/media.dto';
import { UtilService } from 'src/helpers';
import { PaginationQuery } from 'src/interfaces/pagination';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly utilService: UtilService,
  ) {}

  async createMedia(payload: setupMediaDto) {
    try {
      await this.mediaRepository.save(payload);
      return {
        status: 'success',
        message: 'Media created successfully',
        data: {
          id: payload.id,
          name: payload.name,
          description: payload.description,
          url: payload.url,
        },
      };
    } catch (error) {
      return {
        status: 'fail',
        message: error.message || 'Internal server error',
        data: {},
      };
    }
  }

  async getMedia(id: string): Promise<IResponse> {
    try {
      const media = await this.mediaRepository.findOneBy({ id });
      if (!media) throw new NotFoundException('Media not found');
      return {
        status: 'success',
        message: 'Successfully fetched media ',
        data: media,
      };
    } catch (error) {
      return {
        status: 'fail',
        data: {},
        message: error.message || 'Internal server error',
      };
    }
  }

  async findByNameAndDescription(name: string, description: string) {
    try {
      const myMedia = await this.mediaRepository.find({
        where: {
          is_deleted: 'false',
          name: name,
          description: description,
        },
      });
      if (myMedia.length === 0) throw new NotFoundException('Media not found');
      return {
        status: 'success',
        message: 'Successfully fetched media ',
        data: myMedia,
      };
    } catch (error) {
      return {
        status: 'fail',
        message: error.message || 'Internal server error',
        data: {},
      };
    }
  }

  async getAllMedia(paginationQuery: PaginationQuery): Promise<IResponse> {
    try {
      const count = await this.mediaRepository.count({ where: { is_deleted: 'false' } });
      const { limit, offset, totalPages } = this.utilService.getPaginationData(
        paginationQuery,
        count,
      );
      const allMedia = await this.mediaRepository.find({
        where: { is_deleted: 'false' },
        skip: offset,
        take: limit,
      });
      if (allMedia.length === 0) throw new NotFoundException('Media not found');
      return {
        status: 'success',
        message: 'Successfully fetched media',
        data: allMedia,
        meta: {
          totalPages,
          count,
        },
      };
    } catch (error) {
      return {
        status: 'fail',
        message: error.message || 'Internal server error',
        data: {},
      };
    }
  }

  async updateMedia(id: string, payload: updateMediaDto) {
    try {
      const updatedMedia = await this.mediaRepository.findOneBy({ id });
      if (!updatedMedia) {
        throw new NotFoundException('Media with this id not found');
      }
      Object.assign(updatedMedia, payload);
      return this.mediaRepository.save(updatedMedia);
    } catch (error) {
      return {
        status: 'fail',
        message: error.message || 'Internal server error',
        data: {},
      };
    }
  }
  async deleteMedia(id: string) {
    try {
      const deletedMedia = await this.mediaRepository.findOneBy({ id });
      if (deletedMedia) {
        deletedMedia.is_deleted = 'true';
        deletedMedia.deletedAt = new Date();
        await this.mediaRepository.save(deletedMedia);
      }
      return {
        status: 'success',
        message: 'Successfully deleted media',
      };
    } catch (error) {
      return {
        status: 'fail',
        data: {},
        message: error.message || 'Internal server error',
      };
    }
  }
}
