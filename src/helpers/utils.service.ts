import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginationQuery } from 'src/interfaces/pagination';
@Injectable()
export class UtilService {
  constructor(private readonly configService: ConfigService) {}

  deepUpdateResource(resource, data) {
    for (const key in data) {
      if (this.checkIsObject(data[key])) {
        this.deepUpdateResource(resource[key], data[key]);
      } else {
        resource[key] = data[key];
      }
    }
    return resource;
  }

  checkIsObject(data) {
    return typeof data === 'object' && !Array.isArray(data);
  }

  getPaginationData(query: PaginationQuery, count: number) {
    if (!query) {
      return {
        limit: null,
        offset: null,
        totalPages: null,
      };
    }

    const skip = query.page ?? 1;
    const limit = query.limit ?? 1;
    const offset = (skip - 1) * limit;
    const totalPages = Math.ceil(count / limit);

    return {
      limit,
      offset,
      totalPages,
    };
  }
}
