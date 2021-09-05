import got from 'got';
import { StationResponse, StationStatus, StatusResponse } from './types';

const stationUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
const statusUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';
const httpOptions = {
  headers: {
    'Client-Identifier': 'grashorn-kodeoppgave'
  }
};

export async function GetStationStatuses(): Promise<StationStatus[]> {
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