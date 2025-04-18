import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardsService } from './dashboards.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@ApiTags('dashboards')
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get()
  @ApiOperation({ summary: 'List all dashboards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboards retrieved successfully' })
  findAll() {
    return this.dashboardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific dashboard' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboard retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.dashboardsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new dashboard' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Dashboard created successfully' })
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardsService.create(createDashboardDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a dashboard' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboard updated successfully' })
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardsService.update(id, updateDashboardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dashboard' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboard deleted successfully' })
  remove(@Param('id') id: string) {
    return this.dashboardsService.remove(id);
  }
}
