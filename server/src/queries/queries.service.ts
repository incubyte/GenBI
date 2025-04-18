import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query, QueryStatus, QueryType } from './entities/query.entity';
import { QueryResult } from './entities/query-result.entity';
import { ExecuteQueryDto } from './dto/execute-query.dto';
import { SaveQueryDto } from './dto/save-query.dto';
import { SqlGenerationService } from '../common/services/sql-generation.service';

@Injectable()
export class QueriesService {
  constructor(
    @InjectRepository(Query)
    private queryRepository: Repository<Query>,
    @InjectRepository(QueryResult)
    private queryResultRepository: Repository<QueryResult>,
    private sqlGenerationService: SqlGenerationService,
  ) {}

  async executeQuery(executeQueryDto: ExecuteQueryDto): Promise<Query> {
    const { text, dataSourceId, type = QueryType.NATURAL_LANGUAGE } = executeQueryDto;

    // Create a new query
    const query = this.queryRepository.create({
      text,
      type,
      dataSourceId,
      status: QueryStatus.PENDING,
    });

    await this.queryRepository.save(query);

    // Process the query asynchronously
    this.processQuery(query);

    return query;
  }

  private async processQuery(query: Query): Promise<void> {
    try {
      // Update status to running
      query.status = QueryStatus.RUNNING;
      await this.queryRepository.save(query);

      const startTime = Date.now();

      // Generate SQL if it's a natural language query
      if (query.type === QueryType.NATURAL_LANGUAGE) {
        query.sql = await this.sqlGenerationService.generateSql(
          query.text,
          query.dataSourceId,
        );
      } else {
        query.sql = query.text;
      }

      // Simulate query execution
      const result = await this.executeQueryOnDataSource(query.sql, query.dataSourceId);

      // Calculate execution time
      const executionTime = Date.now() - startTime;

      // Save the result
      const queryResult = this.queryResultRepository.create({
        query,
        data: result.data,
        columns: result.columns,
        insights: result.insights,
        executionTime,
      });

      await this.queryResultRepository.save(queryResult);

      // Update the query with execution details
      query.status = QueryStatus.COMPLETED;
      query.executionTime = executionTime;
      query.rowCount = result.data.length;
      await this.queryRepository.save(query);
    } catch (error) {
      // Handle error
      query.status = QueryStatus.FAILED;
      query.error = error.message;
      await this.queryRepository.save(query);
    }
  }

  private async executeQueryOnDataSource(
    sql: string,
    dataSourceId: string,
  ): Promise<{
    data: any[];
    columns: { name: string; type: string }[];
    insights: string[];
  }> {
    // This is a mock implementation
    // In a real application, this would execute the SQL against the actual data source
    
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return mock data
    return {
      data: [
        { id: 1, name: 'Campaign 1', conversions: 120, spend: 1500, roi: 2.5 },
        { id: 2, name: 'Campaign 2', conversions: 85, spend: 1200, roi: 1.8 },
        { id: 3, name: 'Campaign 3', conversions: 210, spend: 2500, roi: 3.2 },
      ],
      columns: [
        { name: 'id', type: 'integer' },
        { name: 'name', type: 'string' },
        { name: 'conversions', type: 'integer' },
        { name: 'spend', type: 'number' },
        { name: 'roi', type: 'number' },
      ],
      insights: [
        'Campaign 3 has the highest ROI at 3.2',
        'Campaign 1 has a good balance of conversions and spend',
        'Consider reallocating budget from Campaign 2 to Campaign 3',
      ],
    };
  }

  async getQueryResults(id: string): Promise<QueryResult> {
    const result = await this.queryResultRepository.findOne({
      where: { queryId: id },
      relations: ['query'],
    });

    if (!result) {
      throw new NotFoundException(`Query results for query with ID ${id} not found`);
    }

    return result;
  }

  async getQueryStatus(id: string): Promise<{ status: QueryStatus; error?: string }> {
    const query = await this.queryRepository.findOne({
      where: { id },
      select: ['status', 'error'],
    });

    if (!query) {
      throw new NotFoundException(`Query with ID ${id} not found`);
    }

    return {
      status: query.status,
      ...(query.error && { error: query.error }),
    };
  }

  async saveQuery(id: string, saveQueryDto: SaveQueryDto): Promise<Query> {
    const query = await this.queryRepository.findOne({
      where: { id },
    });

    if (!query) {
      throw new NotFoundException(`Query with ID ${id} not found`);
    }

    if (query.status !== QueryStatus.COMPLETED) {
      throw new BadRequestException('Cannot save a query that has not completed successfully');
    }

    query.name = saveQueryDto.name;
    query.description = saveQueryDto.description;
    query.isSaved = true;

    return this.queryRepository.save(query);
  }

  async getRecentQueries(limit: number): Promise<Query[]> {
    return this.queryRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async cancelQuery(id: string): Promise<Query> {
    const query = await this.queryRepository.findOne({
      where: { id },
    });

    if (!query) {
      throw new NotFoundException(`Query with ID ${id} not found`);
    }

    if (query.status !== QueryStatus.PENDING && query.status !== QueryStatus.RUNNING) {
      throw new BadRequestException(`Cannot cancel a query with status ${query.status}`);
    }

    query.status = QueryStatus.CANCELLED;
    return this.queryRepository.save(query);
  }

  async getPopularQueries(limit: number): Promise<Query[]> {
    // In a real application, this would use analytics data to determine popularity
    // For now, we'll just return saved queries
    return this.queryRepository.find({
      where: { isSaved: true },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
