import { Injectable } from '@nestjs/common';
import { paginationQuery } from 'src/interfaces';

@Injectable()
export class UtilsService {
  checkIsObject(data) {
    return typeof data === 'object' && !Array.isArray(data);
  }

  getPaginationData(query: paginationQuery, count: number) {
    if (!query) {
      return {
        limit: null,
        offset: null,
        totalPages: null,
      };
    }

    const skip = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (skip - 1) * limit;
    const totalPages = Math.ceil(count / limit);

    return {
      limit,
      offset,
      totalPages,
    };
  }
}
