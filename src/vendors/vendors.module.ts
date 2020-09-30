import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VendorsResolver } from './vendors.resolver';
import { VendorsService } from './vendors.service';

@Module({
  imports: [ConfigModule],
  providers: [VendorsService, VendorsResolver],
  exports: [VendorsService, VendorsResolver],
})
export class VendorsModule {}
