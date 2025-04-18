import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Anthropic } from '@anthropic-ai/sdk';

@Injectable()
export class AnthropicService {
  private anthropic: Anthropic;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');

    if (!apiKey) {
      console.warn('ANTHROPIC_API_KEY is not set. Claude API will not work properly.');
    }

    this.anthropic = new Anthropic({
      apiKey: apiKey || 'dummy-key',
    });
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        temperature: 0,
        system: systemPrompt || 'You are a helpful AI assistant.',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // Check if the content is a text block
      if ('text' in response.content[0]) {
        return response.content[0].text;
      }
      return 'No text content returned';
    } catch (error) {
      console.error('Error calling Anthropic API:', error);
      throw new Error(`Failed to generate text: ${error.message}`);
    }
  }

  async generateSql(query: string, schema: any): Promise<string> {
    const systemPrompt = `You are an expert SQL query generator. Your task is to convert natural language queries into SQL queries based on the provided database schema. Only return the SQL query without any explanations or markdown formatting.`;

    const prompt = `
Database Schema:
${JSON.stringify(schema, null, 2)}

Natural Language Query: ${query}

Generate the SQL query to answer this question. Only return the SQL query without any explanations or markdown formatting.`;

    const sql = await this.generateText(prompt, systemPrompt);

    // Clean up the response to ensure it's just SQL
    return sql.trim();
  }
}
