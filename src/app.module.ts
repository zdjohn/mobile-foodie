import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import appSettings from './config/appSettings';
import { VendorsModule } from './vendors/vendors.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appSettings], isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    VendorsModule,
  ],
  providers: [],
  controllers: [HealthController],
})
export class AppModule {}
