import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueriesController } from './queries.controller';
import { QueriesService } from './queries.service';
import { Query } from './entities/query.entity';
import { QueryResult } from './entities/query-result.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Query, QueryResult]),
    CommonModule,
  ],
  controllers: [QueriesController],
  providers: [QueriesService],
  exports: [QueriesService],
})
export class QueriesModule {}
