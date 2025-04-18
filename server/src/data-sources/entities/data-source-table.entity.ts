import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { DataSource } from './data-source.entity';
import { DataSourceColumn } from './data-source-column.entity';
import { DataSourceRelationship } from './data-source-relationship.entity';

@Entity('data_source_tables')
export class DataSourceTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, type: 'integer' })
  rowCount: number;

  @ManyToOne(() => DataSource, (dataSource) => dataSource.tables, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'data_source_id' })
  dataSource: DataSource;

  @Column()
  dataSourceId: string;

  @OneToMany(() => DataSourceColumn, (column) => column.table)
  columns: DataSourceColumn[];

  @OneToMany(
    () => DataSourceRelationship,
    (relationship) => relationship.sourceTable,
  )
  outgoingRelationships: DataSourceRelationship[];

  @OneToMany(
    () => DataSourceRelationship,
    (relationship) => relationship.targetTable,
  )
  incomingRelationships: DataSourceRelationship[];
}
