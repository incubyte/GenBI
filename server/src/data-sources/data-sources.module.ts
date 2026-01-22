import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourcesController } from './data-sources.controller';
import { DataSourcesService } from './data-sources.service';
import { DataSource } from './entities/data-source.entity';
import { DataSourceSync } from './entities/data-source-sync.entity';
import { DataSourceTable } from './entities/data-source-table.entity';
import { DataSourceColumn } from './entities/data-source-column.entity';
import { DataSourceRelationship } from './entities/data-source-relationship.entity';
import { DataSourceSchema } from './entities/data-source-schema.entity';
import { ConnectionTestService } from './connection-test.service';
import { SchemaExtractionService } from './schema-extraction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DataSource,
      DataSourceSync,
      DataSourceTable,
      DataSourceColumn,
      DataSourceRelationship,
      DataSourceSchema,
    ]),
  ],
  controllers: [DataSourcesController],
  providers: [DataSourcesService, ConnectionTestService, SchemaExtractionService],
  exports: [DataSourcesService, SchemaExtractionService],
})
export class DataSourcesModule {}
