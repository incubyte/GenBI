import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';
import { QueryType } from '../entities/query.entity';

export class ExecuteQueryDto {
  @ApiProperty({
    description: 'The query text (natural language or SQL)',
    example: 'Show me the top 10 campaigns by conversion rate',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The data source ID to query against',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  dataSourceId: string;

  @ApiPropertyOptional({
    description: 'The type of query (natural_language or sql)',
    enum: QueryType,
    default: QueryType.NATURAL_LANGUAGE,
  })
  @IsOptional()
  @IsEnum(QueryType)
  type?: QueryType;
}
