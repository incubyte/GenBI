import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { DataSourcesService } from './data-sources.service';
import { ConnectionTestService } from './connection-test.service';
import { CreateDataSourceDto } from './dto/create-data-source.dto';
import { UpdateDataSourceDto } from './dto/update-data-source.dto';
import { QueryDataSourceDto } from './dto/query-data-source.dto';
import { TestConnectionDto } from './dto/test-connection.dto';
import { SyncDataSourceDto } from './dto/sync-data-source.dto';
import { FilePreviewDto } from './dto/file-preview.dto';
import { DataSource } from './entities/data-source.entity';
import { DataSourceSync } from './entities/data-source-sync.entity';
import { PaginatedResult } from '../common/dto/pagination.dto';

@ApiTags('data-sources')
@ApiBearerAuth()
@Controller('data-sources')
export class DataSourcesController {
  constructor(
    private readonly dataSourcesService: DataSourcesService,
    private readonly connectionTestService: ConnectionTestService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all data sources' })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of data sources',
  })
  async findAll(
    @Query() queryDto: QueryDataSourceDto,
  ): Promise<PaginatedResult<DataSource>> {
    return this.dataSourcesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a data source by ID' })
  @ApiParam({ name: 'id', description: 'Data source ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the data source',
  })
  @ApiResponse({
    status: 404,
    description: 'Data source not found',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<DataSource> {
    return this.dataSourcesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new data source' })
  @ApiResponse({
    status: 201,
    description: 'The data source has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  async create(@Body() createDto: CreateDataSourceDto): Promise<DataSource> {
    return this.dataSourcesService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a data source' })
  @ApiParam({ name: 'id', description: 'Data source ID' })
  @ApiResponse({
    status: 200,
    description: 'The data source has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Data source not found',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateDataSourceDto,
  ): Promise<DataSource> {
    return this.dataSourcesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a data source' })
  @ApiParam({ name: 'id', description: 'Data source ID' })
  @ApiResponse({
    status: 200,
    description: 'The data source has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Data source not found',
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string; id: string }> {
    return this.dataSourcesService.remove(id);
  }

  @Post('test-connection')
  @ApiOperation({ summary: 'Test a data source connection' })
  @ApiResponse({
    status: 200,
    description: 'Connection test result',
  })
  @HttpCode(HttpStatus.OK)
  async testConnection(@Body() testDto: TestConnectionDto) {
    return this.connectionTestService.testConnection(testDto);
  }

  @Post(':id/sync')
  @ApiOperation({ summary: 'Sync a data source' })
  @ApiParam({ name: 'id', description: 'Data source ID' })
  @ApiResponse({
    status: 202,
    description: 'Sync job has been queued',
  })
  @ApiResponse({
    status: 404,
    description: 'Data source not found',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async sync(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() syncDto: SyncDataSourceDto,
  ): Promise<DataSourceSync> {
    return this.dataSourcesService.sync(id, syncDto);
  }

  @Get(':id/sync/:syncId')
  @ApiOperation({ summary: 'Get sync status' })
  @ApiParam({ name: 'id', description: 'Data source ID' })
  @ApiParam({ name: 'syncId', description: 'Sync job ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the sync status',
  })
  @ApiResponse({
    status: 404,
    description: 'Data source or sync job not found',
  })
  async getSyncStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('syncId', ParseUUIDPipe) syncId: string,
  ): Promise<DataSourceSync> {
    return this.dataSourcesService.getSyncStatus(id, syncId);
  }

}
