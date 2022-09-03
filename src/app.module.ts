import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { EnvConfiguration, JoiValidationSchema } from './config';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    MongooseModule.forRoot(process.env.MONGODB),

    AuthModule,
    SeedModule,
    CommonModule,
  ],
  exports: [ConfigModule],
})
export class AppModule {}
