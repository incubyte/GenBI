import { Injectable } from '@nestjs/common';
import { AnthropicService } from './anthropic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from '../../data-sources/entities/data-source.entity';
import { DataSourceTable } from '../../data-sources/entities/data-source-table.entity';
import { DataSourceColumn } from '../../data-sources/entities/data-source-column.entity';

@Injectable()
export class SqlGenerationService {
  constructor(
    private anthropicService: AnthropicService,
    @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,
    @InjectRepository(DataSourceTable)
    private tableRepository: Repository<DataSourceTable>,
    @InjectRepository(DataSourceColumn)
    private columnRepository: Repository<DataSourceColumn>,
  ) {}

  async generateSqlFromNaturalLanguage(
    query: string,
    databaseSchema: string,
  ): Promise<string> {
    const systemPrompt = `
      You are an expert SQL query generator. Your task is to convert natural language questions into valid SQL queries.
      Follow these rules:
      1. Generate only the SQL query, nothing else.
      2. Make sure the query is valid and follows best practices.
      3. Use the provided database schema to ensure the query references valid tables and columns.
      4. Add appropriate comments to explain complex parts of the query.
      5. Use appropriate joins, aggregations, and filters based on the question.
      6. Limit results to a reasonable number (e.g., 1000 rows) unless specified otherwise.
    `;

    const prompt = `
      Database Schema:
      ${databaseSchema}

      Natural Language Query:
      ${query}

      Generate the SQL query:
    `;

    const sql = await this.anthropicService.generateText(prompt, systemPrompt);
    return sql.trim();
  }

  async generateSql(query: string, dataSourceId: string): Promise<string> {
    // Get the data source schema
    const schema = await this.getDataSourceSchema(dataSourceId);

    // Use Claude to generate SQL
    const sql = await this.anthropicService.generateSql(query, schema);

    return sql;
  }

  private async getDataSourceSchema(dataSourceId: string): Promise<any> {
    // Get the data source
    const dataSource = await this.dataSourceRepository.findOne({
      where: { id: dataSourceId },
      relations: ['tables', 'tables.columns'],
    });

    if (!dataSource) {
      throw new Error(`Data source with ID ${dataSourceId} not found`);
    }

    // Format the schema for Claude
    const schema = {
      tables: dataSource.tables.map((table) => ({
        name: table.name,
        columns: table.columns.map((column) => ({
          name: column.name,
          type: column.type,
          isPrimary: column.isPrimary,
          isNullable: column.isNullable,
          description: column.description,
        })),
      })),
    };

    return schema;
  }

  async generateInsightsFromQueryResults(
    query: string,
    sql: string,
    results: any[],
  ): Promise<any[]> {
    const systemPrompt = `
      You are an expert data analyst. Your task is to generate meaningful insights from SQL query results.
      Follow these rules:
      1. Provide 3-5 concise, actionable insights.
      2. Each insight should have a title, description, and type (info, positive, negative, or neutral).
      3. Focus on patterns, trends, anomalies, and business implications.
      4. Be specific and reference actual values from the data.
      5. Return the insights as a valid JSON array.
    `;

    const prompt = `
      Natural Language Query:
      ${query}

      SQL Query:
      ${sql}

      Query Results (first 100 rows or less):
      ${JSON.stringify(results.slice(0, 100), null, 2)}

      Generate insights from these results. Return ONLY a valid JSON array of insights with the following structure:
      [
        {
          "title": "Insight title",
          "description": "Detailed explanation of the insight",
          "type": "info|positive|negative|neutral"
        },
        ...
      ]
    `;

    const insightsText = await this.anthropicService.generateText(prompt, systemPrompt);

    try {
      return JSON.parse(insightsText);
    } catch (error) {
      console.error('Error parsing insights JSON:', error);
      return [];
    }
  }

  async suggestVisualizations(
    query: string,
    sql: string,
    results: any[],
  ): Promise<any[]> {
    const systemPrompt = `
      You are an expert data visualization specialist. Your task is to suggest appropriate visualizations for SQL query results.
      Follow these rules:
      1. Suggest 2-4 different visualization types that would best represent the data.
      2. Each suggestion should include a type, title, and description.
      3. Consider the data types, relationships, and the original query intent.
      4. Return the suggestions as a valid JSON array.
    `;

    const prompt = `
      Natural Language Query:
      ${query}

      SQL Query:
      ${sql}

      Query Results (first 20 rows or less):
      ${JSON.stringify(results.slice(0, 20), null, 2)}

      Suggest visualizations for these results. Return ONLY a valid JSON array with the following structure:
      [
        {
          "type": "bar|line|pie|scatter|table|etc",
          "title": "Suggested title for the visualization",
          "description": "Why this visualization is appropriate"
        },
        ...
      ]
    `;

    const visualizationsText = await this.anthropicService.generateText(prompt, systemPrompt);

    try {
      return JSON.parse(visualizationsText);
    } catch (error) {
      console.error('Error parsing visualizations JSON:', error);
      return [];
    }
  }
}
