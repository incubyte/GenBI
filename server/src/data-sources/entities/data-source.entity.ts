import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DataSourceTable } from './data-source-table.entity';
import { DataSourceSync } from './data-source-sync.entity';

export enum DataSourceType {
  POSTGRESQL = 'postgresql',
  MYSQL = 'mysql',
  SQLITE = 'sqlite',
  MONGODB = 'mongodb',
  CSV = 'csv',
  EXCEL = 'excel',
  JSON = 'json',
  API = 'api',
}

export enum DataSourceStatus {
  CONNECTED = 'connected',
  CONNECTING = 'connecting',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}

export enum SyncFrequency {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  NEVER = 'never',
}

@Entity('data_sources')
export class DataSource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    enum: DataSourceType,
  })
  type: DataSourceType;

  @Column({
    type: 'varchar',
    enum: DataSourceStatus,
    default: DataSourceStatus.CONNECTING,
  })
  status: DataSourceStatus;

  @Column({ type: 'json' })
  connectionDetails: Record<string, any>;

  @Column({ nullable: true })
  lastSync: Date;

  @Column({ nullable: true, type: 'integer' })
  recordCount: number;

  @Column({ nullable: true })
  error: string;

  @Column({ type: 'json', nullable: true })
  syncSchedule: {
    frequency: SyncFrequency;
    time?: string;
    timezone?: string;
    lastRun?: string;
    nextRun?: string;
  };

  @Column({ nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => DataSourceTable, (table) => table.dataSource)
  tables: DataSourceTable[];

  @OneToMany(() => DataSourceSync, (sync) => sync.dataSource)
  syncHistory: DataSourceSync[];
}
