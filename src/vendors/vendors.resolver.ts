import { Args, Query, Resolver } from '@nestjs/graphql';
import { VendorsService } from './vendors.service';
import { LatLng, Vendor } from './vendors.models';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(_of => Vendor)
export class VendorsResolver {
  constructor(private vendorsService: VendorsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(_return => [Vendor])
  async nearestVendors(@Args() latlng: LatLng) {
    return this.vendorsService.topVendors(
      latlng.latitude,
      latlng.longitude,
      latlng.size || 5,
    );
  }
}
