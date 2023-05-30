import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';
import logger from '../common/services/logger.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/models/*.entity{.ts,.js}'],
        logging: false,
        synchronize: false,
        migrationsRun: true,
        migrations: [
          __dirname + '/**/migrations/*{.ts,.js}',
          __dirname + '/**/seedings/*{.ts,.js}',
        ],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  public async runMigrations(configService: ConfigService) {
    const connection: Connection = await createConnection({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
    });
    logger.info('Start migration', connection.migrations);
    return connection.runMigrations({ transaction: 'each' });
  }
}
