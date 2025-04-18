import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnthropicService } from './services/anthropic.service';
import { SqlGenerationService } from './services/sql-generation.service';
import { DataSource } from '../data-sources/entities/data-source.entity';
import { DataSourceTable } from '../data-sources/entities/data-source-table.entity';
import { DataSourceColumn } from '../data-sources/entities/data-source-column.entity';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      DataSource,
      DataSourceTable,
      DataSourceColumn,
    ]),
  ],
  providers: [AnthropicService, SqlGenerationService],
  exports: [AnthropicService, SqlGenerationService],
})
export class CommonModule {}
