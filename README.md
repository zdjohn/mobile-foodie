## Description

This GraphQL API returns top 5 food trucks based on the given latitude and longitude. A csv dump of the latest San Francisco's food truck open dataset is saved as release.csv in the repo. (ref: https://data.sfgov.org/api/views/rqzj-sfat/rows.csv)

## Prerequisites

- [Docker](https://www.docker.com/)
- [Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)
- [NodeJs](https://nodejs.org/en/)

## Running the app

```bash
# start app with docker-compose
$ make dev-start
# tear down the running app
$ make teardown

# to run a clean pre-deployment test build
$ make testbuild
```

GraphQL playground would be ready at: http://localhost:3000/graphql check out the [sample query](#Query-Sample) below

## Development

```bash
# set environment variable settings
$ make setenv ENVFILE=.env.dev

# start app
# this will install required dependency, then run app in (watch and debug mode
$ make dev-watch

# running unit test
$ make unittest

# tear down all running app
$ make teardown

# clean up generated folders and files
$ make clean
```

alternatively, please checkout `package.json` for more npm options.

## Deployment

```bash
# sets environment variables (e.g. for release)
$ make release ENVFILE=.env.release
```

now the dockerized app is ready to go via `docker run --rm -it -p 3000:3000 mobile-foodie`

## Demo

### Query Sample

```query
{
  nearestVendors(
    latitude: 37.7875398934675,
    longitude: -122.397726709152) {
    name
    id
    latitude
    longitude
    address
    facilityType
  }
}
```

### Response Sample

```response
{
  "data": {
    "nearestVendors": [
      {
        "name": "Street Meet",
        "id": "1447794",
        "latitude": 37.7875398934675,
        "longitude": -122.397726709152,
        "address": "564 HOWARD ST",
        "facilityType": "Truck"
      },
      {
        "name": "Star Taco",
        "id": "1367290",
        "latitude": 37.7873042488646,
        "longitude": -122.398037251912,
        "address": "580 HOWARD ST",
        "facilityType": ""
      },
      ...
    ]
  }
}
```
