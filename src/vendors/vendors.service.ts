import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from '@fast-csv/parse';
import { ConfigService } from '@nestjs/config';
import { Vendor, VendorRaw } from './vendors.models';

@Injectable()
export class VendorsService implements OnModuleInit {
  vendorsStore: Vendor[];
  get csvSource(): string {
    return this.config.get('csvSource');
  }

  constructor(private config: ConfigService) {
    this.vendorsStore = [];
  }

  async onModuleInit() {
    await this.initCsvStore();
  }

  getDistanceScore = (x_lat, x_lng, y_lat, y_lng): number => {
    return (
      Math.pow(Math.abs(x_lat - y_lat), 2) +
      Math.pow(Math.abs(x_lng - y_lng), 2)
    );
  };

  sortByLatLng = (lat: number, lng: number, a: Vendor, b: Vendor): number => {
    const distance_a = this.getDistanceScore(lat, lng, a.latitude, a.longitude);
    const distance_b = this.getDistanceScore(lat, lng, b.latitude, b.longitude);
    return distance_a >= distance_b ? 1 : -1;
  };

  async topVendors(lat: number, lng: number, size = 5): Promise<Vendor[]> {
    if (!this.vendorsStore) return [];
    return this.vendorsStore
      .sort((a, b) => this.sortByLatLng(lat, lng, a, b))
      .slice(0, size);
  }

  async initCsvStore() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.csvSource)
        .pipe(
          parse({ ignoreEmpty: true, headers: true }).transform(
            (data: VendorRaw): Vendor => ({
              address: data.Address,
              id: data.locationid,
              name: data.Applicant,
              facilityType: data.FacilityType,
              latitude: parseFloat(data.Latitude),
              longitude: parseFloat(data.Longitude),
            }),
          ),
        )
        .on('error', error => {
          reject(error);
        })
        .on('data', (row: Vendor) => {
          this.vendorsStore.push(row);
        })
        .on('end', (rowCount: number) => {
          resolve(`${rowCount} loaded`);
        });
    });
  }
}
