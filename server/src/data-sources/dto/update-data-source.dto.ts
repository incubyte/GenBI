import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsObject,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SyncFrequency } from '../entities/data-source.entity';

class SyncScheduleDto {
  @ApiPropertyOptional({
    enum: SyncFrequency,
    description: 'Frequency of synchronization',
  })
  @IsEnum(SyncFrequency)
  @IsOptional()
  frequency?: SyncFrequency;

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

export class UpdateDataSourceDto {
  @ApiPropertyOptional({
    description: 'Name of the data source',
    example: 'Updated Marketing Database',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the data source',
    example: 'Updated description for marketing database',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Connection details for the data source',
    example: {
      host: 'new-host.example.com',
      port: 5432,
      database: 'marketing',
      username: 'new_user',
      password: 'new_password',
      ssl: true,
    },
  })
  @IsOptional()
  @IsObject()
  connectionDetails?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Sync schedule configuration',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SyncScheduleDto)
  syncSchedule?: SyncScheduleDto;
}
