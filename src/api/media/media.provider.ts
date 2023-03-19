import { Injectable } from '@nestjs/common';
import { MediaService } from './media.service';
import { IResponse } from '../../interfaces';

@Injectable()
export class MediaProvider {
  constructor(private readonly moduleService: MediaService) {}

  async login(): Promise<IResponse> {
    return;
  }
}
