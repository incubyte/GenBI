import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class SaveQueryDto {
  @ApiProperty({
    description: 'The name of the query',
    example: 'Top Campaigns by Conversion',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the query',
    example: 'Shows the top 10 campaigns sorted by conversion rate',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
