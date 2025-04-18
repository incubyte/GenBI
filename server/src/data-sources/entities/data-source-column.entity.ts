import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DataSourceTable } from './data-source-table.entity';

@Entity('data_source_columns')
export class DataSourceColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  type: string;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ default: false })
  isNullable: boolean;

  @Column({ nullable: true, length: 500 })
  description: string;

  @ManyToOne(() => DataSourceTable, (table) => table.columns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'table_id' })
  table: DataSourceTable;

  @Column()
  tableId: string;
}
