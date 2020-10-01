import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { VendorsService } from './vendors.service';

function testSettings() {
  return {
    csvSource: 'test.csv',
  };
}

describe('CsvStoreService', () => {
  let service: VendorsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorsService],
      imports: [
        ConfigModule.forRoot({
          load: [testSettings],
        }),
      ],
    }).compile();

    service = module.get<VendorsService>(VendorsService);
  });

  it('should return top 5 vendors', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await service.onModuleInit();
    expect(service.vendorsStore.length).toBeGreaterThan(0);

    const vendors = await service.topVendors(
      37.7875398934675,
      -122.397726709152,
    );

    expect(vendors.length).toBe(5);
    expect(vendors[0].name).toBe('Street Meet');
  });
});
