import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { EnvConfiguration, JoiValidationSchema } from './config';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('dbHost'),
        port: configService.get('dbPort'),
        database: configService.get('dbName'),
        password: configService.get('dbPassword'),
        username: configService.get('dbUsername'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    AuthModule,
    SeedModule,
    CommonModule,
  ],
  exports: [ConfigModule],
})
export class AppModule {}
