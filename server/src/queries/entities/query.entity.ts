import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { QueryResult } from './query-result.entity';

export enum QueryStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum QueryType {
  NATURAL_LANGUAGE = 'natural_language',
  SQL = 'sql',
}

@Entity('queries')
export class Query {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  text: string;

  @Column({
    type: 'varchar',
    enum: QueryType,
    default: QueryType.NATURAL_LANGUAGE,
  })
  type: QueryType;

  @Column({ nullable: true, length: 5000 })
  sql: string;

  @Column({
    type: 'varchar',
    enum: QueryStatus,
    default: QueryStatus.PENDING,
  })
  status: QueryStatus;

  @Column({ nullable: true })
  dataSourceId: string;

  @Column({ nullable: true })
  error: string;

  @Column({ default: false })
  isSaved: boolean;

  @Column({ nullable: true, length: 100 })
  name: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column({ nullable: true })
  executionTime: number;

  @Column({ nullable: true })
  rowCount: number;

  @Column({ nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => QueryResult, (result) => result.query)
  results: QueryResult[];
}
