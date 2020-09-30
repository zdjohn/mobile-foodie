import { Test, TestingModule } from '@nestjs/testing';
import { VendorsService } from './vendors.service';
import { VendorsResolver } from './vendors.resolver';
import { ConfigModule } from '@nestjs/config';

describe('VendorsResolver', () => {
  let resolver: VendorsResolver;
  let service: VendorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [VendorsResolver, VendorsService],
    }).compile();

    resolver = module.get<VendorsResolver>(VendorsResolver);
    service = module.get<VendorsService>(VendorsService);

    jest
      .spyOn(service, 'topFiveVendors')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((lat: number, lng: number) => {
        const vendorsList = [
          {
            id: '1',
            name: 'test',
            facilityType: 'test type',
            address: 'test address',
            latitude: 1.0,
            longitude: 1.0,
          },
        ];
        return Promise.resolve(vendorsList);
      });
  });

  it('should be defined', async () => {
    expect(resolver).toBeDefined();
    const vendors = await resolver.nearestVendors({
      latitude: 1,
      longitude: 2,
    });
    expect(vendors).toBeDefined();
  });
});
