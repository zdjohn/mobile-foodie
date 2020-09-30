/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Float, Int, ObjectType } from '@nestjs/graphql';

// expected model response
// {
//   name: 'test vendor',
//   address: 'test address',
//   facilityType: 'truck',
//   latitude: 1,
//   longitude: 1,
//   id: 'id',
// }

@ObjectType()
export class Vendor {
  @Field()
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  facilityType: string;

  @Field(type => String)
  address: string;

  @Field(type => Float)
  latitude: number;

  @Field(type => Float)
  longitude: number;
}

export type VendorRaw = {
  locationid: string;
  Applicant: string;
  Address: string;
  Latitude: string;
  Longitude: string;
  FacilityType: string;
};

@ArgsType()
export class LatLng {
  @Field(type => Float)
  longitude: number;

  @Field(type => Float)
  latitude: number;
}
