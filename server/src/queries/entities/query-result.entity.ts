import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Query } from './query.entity';

@Entity('query_results')
export class QueryResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Query, (query) => query.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'query_id' })
  query: Query;

  @Column()
  queryId: string;

  @Column({ type: 'json' })
  data: any;

  @Column({ type: 'json', nullable: true })
  columns: { name: string; type: string }[];

  @Column({ type: 'json', nullable: true })
  insights: string[];

  @Column({ nullable: true })
  executionTime: number;

  @CreateDateColumn()
  createdAt: Date;
}
