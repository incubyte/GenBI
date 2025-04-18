import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsArray, IsString } from 'class-validator';

export class SyncDataSourceDto {
  @ApiPropertyOptional({
    description: 'Whether to perform a full sync or incremental sync',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  fullSync?: boolean = false;

  @ApiPropertyOptional({
    description: 'Specific tables to sync',
    type: [String],
    example: ['campaigns', 'campaign_metrics'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tables?: string[];
}
