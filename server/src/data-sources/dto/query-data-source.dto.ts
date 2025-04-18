import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DataSourceStatus, DataSourceType } from '../entities/data-source.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryDataSourceDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search term to filter data sources by name or type',
    example: 'marketing',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: DataSourceStatus,
    description: 'Filter by connection status',
  })
  @IsOptional()
  @IsEnum(DataSourceStatus)
  status?: DataSourceStatus;

  @ApiPropertyOptional({
    enum: DataSourceType,
    description: 'Filter by data source type',
  })
  @IsOptional()
  @IsEnum(DataSourceType)
  type?: DataSourceType;
}
