import express = require('express');
import got from 'got';
import { StationResponse, StationStatus, StatusResponse } from './types';

const app = express();

const stationUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
const statusUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';
const httpOptions = {
  headers: {
    'Client-Identifier': 'grashorn-kodeoppgave'
  }
};

app.get('/', async (req, res, next) => {
  let stationStatuses: StationStatus[]

  try {
    stationStatuses = await GetStationStatuses();
  } catch (e) {
    next(e)
  }

  res.send(stationStatuses)
});

app.use(errorHandler);

// Use cors

const port = 3000;
app.listen(port, () => {
  console.log(`API listening at port ${port}`)
})

async function GetStationStatuses(): Promise<StationStatus[]> {
  const [stationResponse, statusResponse] = await Promise.all<StationResponse, StatusResponse>([
    got.get(stationUrl, httpOptions).json(),
    got.get(statusUrl, httpOptions).json()
  ]);

  let stationStatuses: StationStatus[] = [];

  for (const station of stationResponse.data.stations) {
    const status = statusResponse.data.stations.find(status => status.station_id === station.station_id);
    const stationStatus: StationStatus = {
      name: station.name,
      bikes: status.num_bikes_available,
      docks: status.num_docks_available
    };

    stationStatuses.push(stationStatus);
  }
  return stationStatuses.sort((a,b) => a.name.localeCompare(b.name));
}

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
}
