import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsObject,
  ValidateNested,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DataSourceType, SyncFrequency } from '../entities/data-source.entity';

class SyncScheduleDto {
  @ApiProperty({
    enum: SyncFrequency,
    description: 'Frequency of synchronization',
  })
  @IsEnum(SyncFrequency)
  frequency: SyncFrequency;

  @ApiPropertyOptional({
    description: 'Time of day to run the sync (HH:MM:SS)',
    example: '02:00:00',
  })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiPropertyOptional({
    description: 'Timezone for the sync schedule',
    example: 'UTC',
  })
  @IsOptional()
  @IsString()
  timezone?: string;
}

export class CreateDataSourceDto {
  @ApiProperty({
    description: 'Name of the data source',
    example: 'Marketing Database',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the data source',
    example: 'PostgreSQL database containing marketing campaign data',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

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
    description: 'Sync schedule configuration',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SyncScheduleDto)
  syncSchedule?: SyncScheduleDto;

  @ApiPropertyOptional({
    description: 'ID of the file for file-based data sources',
    example: 'file-123456',
  })
  @IsOptional()
  @IsString()
  fileId?: string;
}
