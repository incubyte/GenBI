import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueriesService } from './queries.service';
import { ExecuteQueryDto } from './dto/execute-query.dto';
import { SaveQueryDto } from './dto/save-query.dto';

@ApiTags('queries')
@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post('execute')
  @ApiOperation({ summary: 'Execute a natural language query' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Query executed successfully' })
  executeQuery(@Body() executeQueryDto: ExecuteQueryDto) {
    return this.queriesService.executeQuery(executeQueryDto);
  }

  @Get(':id/results')
  @ApiOperation({ summary: 'Get query results' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Query results retrieved successfully' })
  getQueryResults(@Param('id') id: string) {
    return this.queriesService.getQueryResults(id);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Get query status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Query status retrieved successfully' })
  getQueryStatus(@Param('id') id: string) {
    return this.queriesService.getQueryStatus(id);
  }

  @Post(':id/save')
  @ApiOperation({ summary: 'Save a query' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Query saved successfully' })
  saveQuery(@Param('id') id: string, @Body() saveQueryDto: SaveQueryDto) {
    return this.queriesService.saveQuery(id, saveQueryDto);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent queries' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Recent queries retrieved successfully' })
  getRecentQueries(@Query('limit') limit: number = 10) {
    return this.queriesService.getRecentQueries(limit);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel a query' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Query cancelled successfully' })
  @HttpCode(HttpStatus.OK)
  cancelQuery(@Param('id') id: string) {
    return this.queriesService.cancelQuery(id);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular queries' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Popular queries retrieved successfully' })
  getPopularQueries(@Query('limit') limit: number = 10) {
    return this.queriesService.getPopularQueries(limit);
  }
}
