export class ApiResponse {
    observations: Observation[]
}

export class SeriesValue {
    v: number;
}

interface SeriesObservation {
    [key: string]: SeriesValue;
}

export type Observation = SeriesObservation & {
    d: string;
}

