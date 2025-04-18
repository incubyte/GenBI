import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { DataSourceType } from '../entities/data-source.entity';

export class TestConnectionDto {
  @ApiProperty({
    enum: DataSourceType,
    description: 'Type of data source',
    example: DataSourceType.POSTGRESQL,
  })
  @IsEnum(DataSourceType)
  type: DataSourceType;

  @ApiProperty({
    description: 'Connection details for the data source',
    example: {
      host: 'localhost',
      port: 5432,
      database: 'marketing',
      username: 'user',
      password: 'password',
      ssl: false,
    },
  })
  @IsObject()
  connectionDetails: Record<string, any>;

  @ApiPropertyOptional({
    description: 'ID of the file for file-based data sources',
    example: 'file-123456',
  })
  @IsOptional()
  @IsString()
  fileId?: string;
}
