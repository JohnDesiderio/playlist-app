import { ISpotifyResponse } from "../textfield-search/business-logic/ISpotifyTypes"

export interface ITrack {
    song: string
    album: string,
    artist: string | undefined,
    image?: string | undefined,
    id: string,
    uri: string,
}

export interface IRGProps {
    response: ISpotifyResponse | undefined,
    resetResponse: () => void,
    openThankYou: () => void,
}

export interface IResultGridItem {
    updateMap: (item: ITrack) => void,
    song: string
    album: string,
    artist: string | undefined,
    image?: string | undefined,
    id: string,
    uri: string,
}