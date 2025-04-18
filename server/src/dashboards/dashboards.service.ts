import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { DashboardWidget } from './entities/dashboard-widget.entity';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardRepository: Repository<Dashboard>,
    @InjectRepository(DashboardWidget)
    private widgetRepository: Repository<DashboardWidget>,
  ) {}

  async findAll(): Promise<Dashboard[]> {
    return this.dashboardRepository.find({
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Dashboard> {
    const dashboard = await this.dashboardRepository.findOne({
      where: { id },
      relations: ['widgets'],
    });

    if (!dashboard) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }

    return dashboard;
  }

  async create(createDashboardDto: CreateDashboardDto): Promise<Dashboard> {
    const { widgets, ...dashboardData } = createDashboardDto;

    // Create the dashboard
    const dashboard = this.dashboardRepository.create(dashboardData);
    await this.dashboardRepository.save(dashboard);

    // Create widgets if provided
    if (widgets && widgets.length > 0) {
      const widgetEntities = widgets.map((widget) =>
        this.widgetRepository.create({
          ...widget,
          dashboard,
        }),
      );
      await this.widgetRepository.save(widgetEntities);
      dashboard.widgets = widgetEntities;
    }

    return dashboard;
  }

  async update(id: string, updateDashboardDto: UpdateDashboardDto): Promise<Dashboard> {
    const dashboard = await this.findOne(id);
    const { widgets, ...dashboardData } = updateDashboardDto;

    // Update dashboard properties
    Object.assign(dashboard, dashboardData);
    await this.dashboardRepository.save(dashboard);

    // Update widgets if provided
    if (widgets) {
      // Remove existing widgets
      if (dashboard.widgets && dashboard.widgets.length > 0) {
        await this.widgetRepository.remove(dashboard.widgets);
      }

      // Create new widgets
      const widgetEntities = widgets.map((widget) =>
        this.widgetRepository.create({
          ...widget,
          dashboard,
        }),
      );
      await this.widgetRepository.save(widgetEntities);
      dashboard.widgets = widgetEntities;
    }

    return dashboard;
  }

  async remove(id: string): Promise<void> {
    const dashboard = await this.findOne(id);
    await this.dashboardRepository.remove(dashboard);
  }
}
