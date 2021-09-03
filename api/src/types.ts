export interface StationResponse {
    data: {
        stations: Array<{
            station_id: number;
            name: string;
        }>
    }
}

export interface StatusResponse {
    data: {
        stations: Array<{
            station_id: number;
            num_bikes_available: number;
            num_docks_available: number;
        }>
    }
}

export interface StationStatus {
    name: string;
    bikes: number;
    docks: number;
}
