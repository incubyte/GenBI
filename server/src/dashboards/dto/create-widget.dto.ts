import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUUID, IsObject } from 'class-validator';
import { WidgetType, ChartType } from '../entities/dashboard-widget.entity';

export class CreateWidgetDto {
  @ApiProperty({
    description: 'The title of the widget',
    example: 'Campaign Conversions',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The type of widget',
    enum: WidgetType,
    example: WidgetType.CHART,
  })
  @IsEnum(WidgetType)
  type: WidgetType;

  @ApiPropertyOptional({
    description: 'The ID of the query to use for this widget',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  queryId?: string;

  @ApiPropertyOptional({
    description: 'The configuration for the widget',
    example: {
      chartType: ChartType.BAR,
      xAxis: 'campaign',
      yAxis: 'conversions',
      colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
      showLegend: true,
    },
  })
  @IsOptional()
  @IsObject()
  config?: {
    chartType?: ChartType;
    xAxis?: string;
    yAxis?: string | string[];
    colors?: string[];
    showLegend?: boolean;
    [key: string]: any;
  };

  @ApiPropertyOptional({
    description: 'The position of the widget in the dashboard grid',
    example: { x: 0, y: 0, w: 6, h: 4 },
  })
  @IsOptional()
  @IsObject()
  position?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}
