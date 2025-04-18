import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Dashboard } from './dashboard.entity';

export enum WidgetType {
  CHART = 'chart',
  TABLE = 'table',
  METRIC = 'metric',
  TEXT = 'text',
}

export enum ChartType {
  BAR = 'bar',
  LINE = 'line',
  PIE = 'pie',
  SCATTER = 'scatter',
  AREA = 'area',
}

@Entity('dashboard_widgets')
export class DashboardWidget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({
    type: 'varchar',
    enum: WidgetType,
    default: WidgetType.CHART,
  })
  type: WidgetType;

  @Column({ nullable: true })
  queryId: string;

  @Column({ type: 'json', nullable: true })
  config: {
    chartType?: ChartType;
    xAxis?: string;
    yAxis?: string | string[];
    colors?: string[];
    showLegend?: boolean;
    [key: string]: any;
  };

  @Column({ type: 'json', nullable: true })
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.widgets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dashboard_id' })
  dashboard: Dashboard;

  @Column()
  dashboardId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
