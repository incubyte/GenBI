import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DataSourceTable } from './data-source-table.entity';

@Entity('data_source_relationships')
export class DataSourceRelationship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => DataSourceTable, (table) => table.outgoingRelationships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'source_table_id' })
  sourceTable: DataSourceTable;

  @Column()
  sourceTableId: string;

  @Column({ length: 100 })
  sourceColumn: string;

  @ManyToOne(() => DataSourceTable, (table) => table.incomingRelationships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'target_table_id' })
  targetTable: DataSourceTable;

  @Column()
  targetTableId: string;

  @Column({ length: 100 })
  targetColumn: string;
}
