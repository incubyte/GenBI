import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWidgetDto } from './create-widget.dto';

export class CreateDashboardDto {
  @ApiProperty({
    description: 'The name of the dashboard',
    example: 'Marketing Performance',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The description of the dashboard',
    example: 'Overview of marketing campaign performance metrics',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The layout configuration for the dashboard',
    example: { columns: 12, rowHeight: 50 },
  })
  @IsOptional()
  @IsObject()
  layout?: any;

  @ApiPropertyOptional({
    description: 'The widgets to add to the dashboard',
    type: [CreateWidgetDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWidgetDto)
  widgets?: CreateWidgetDto[];
}
