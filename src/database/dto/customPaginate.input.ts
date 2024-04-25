import { IsInt } from 'class-validator';

export class CustomPaginateInputDto {
  @IsInt()
  limit: number;

  @IsInt()
  page: number;
}

export enum EnumSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
