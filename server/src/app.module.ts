import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSourcesModule } from './data-sources/data-sources.module';
import { QueriesModule } from './queries/queries.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Database configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_PATH', './data/genbi.db'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true, // Set to false in production
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    
    // Feature modules
    CommonModule,
    DataSourcesModule,
    QueriesModule,
    DashboardsModule,
  ],
})
export class AppModule {}
