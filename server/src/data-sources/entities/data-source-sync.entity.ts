import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DataSource } from './data-source.entity';

export enum SyncStatus {
  QUEUED = 'queued',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

@Entity('data_source_syncs')
export class DataSourceSync {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DataSource, (dataSource) => dataSource.syncHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'data_source_id' })
  dataSource: DataSource;

  @Column()
  dataSourceId: string;

  @Column({
    type: 'varchar',
    enum: SyncStatus,
    default: SyncStatus.QUEUED,
  })
  status: SyncStatus;

  @Column({ type: 'integer', default: 0 })
  progress: number;

  @Column({ default: false })
  fullSync: boolean;

  @Column({ type: 'json', nullable: true })
  tables: string[];

  @CreateDateColumn()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  estimatedCompletionTime: Date;

  @Column({ type: 'integer', nullable: true })
  tablesProcessed: number;

  @Column({ type: 'integer', nullable: true })
  totalTables: number;

  @Column({ type: 'integer', nullable: true })
  recordsProcessed: number;

  @Column({ nullable: true })
  error: string;
}
