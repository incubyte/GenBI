import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourcesController } from './data-sources.controller';
import { DataSourcesService } from './data-sources.service';
import { DataSource } from './entities/data-source.entity';
import { DataSourceSync } from './entities/data-source-sync.entity';
import { DataSourceTable } from './entities/data-source-table.entity';
import { DataSourceColumn } from './entities/data-source-column.entity';
import { DataSourceRelationship } from './entities/data-source-relationship.entity';
import { FileUploadService } from './file-upload.service';
import { ConnectionTestService } from './connection-test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DataSource,
      DataSourceSync,
      DataSourceTable,
      DataSourceColumn,
      DataSourceRelationship,
    ]),
  ],
  controllers: [DataSourcesController],
  providers: [DataSourcesService, FileUploadService, ConnectionTestService],
  exports: [DataSourcesService],
})
export class DataSourcesModule {}
