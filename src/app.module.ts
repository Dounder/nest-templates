import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';

import { CommonModule } from './common/common.module';
import { ENV_CONFIGURATION } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ENV_CONFIGURATION],
      validationSchema: JoiValidationSchema,
    }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [
        /* AuthModule */
      ],
      inject: [
        /* JwtService */
      ],
      useFactory: async (/* jwtService: JwtService */) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault],
        context: ({ req }) => {
          // const token = req.headers.authorization?.replace(/[Bb]earer\s?/g, '');
          // if (!token) throw Error('Token needed');
          // const payload = jwtService.decode(token);
          // if (!payload) throw Error('Token not valid');
        },
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
    }),

    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
