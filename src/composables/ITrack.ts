import { ISpotifyDanceability } from "../components/results-grid/IResultsTypes"

export interface track {
    id: string,
    uri: string,
    metrics: ISpotifyDanceability,
}