import { IsEnum } from 'class-validator';
import { Status } from '../schema/index.entity';

export class setupMediaDto {
  id: string;
  name: string;
  description: string;
  url: string;
  @IsEnum(Status)
  status: Status;
  createdAt: Date;
  updated: Date;
  deletedAt: Date;
}

export class updateMediaDto {
  @IsEnum(Status)
  status: Status;
}
