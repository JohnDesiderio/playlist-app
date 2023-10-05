export interface ITrack {
    song: string
    album: string,
    artist: string | undefined,
    image?: string | undefined,
    id: string,
    uri: string,
    metrics?: ISpotifyDanceability,
    external_url: string
}

export interface IRGProps {
    response: ITrack[]  | undefined,
    resetResponse: () => void,
    openThankYou: () => void,
    accessToken: string,
}

export interface IResultGridItem {
    updateMap: (item: ITrack) => void,
    song: string
    album: string,
    artist: string | undefined,
    image?: string | undefined,
    id: string,
    uri: string,
    redirect_url: string,
    metrics?: ISpotifyDanceability,
}

export interface ISpotifyDanceability {
    acousticness: number,
    analysis_url: string,
    danceability: number,
    duration_ms: number,
    energy: number,
    id: string,
    instrumentalness: number,
    key: number,
    liveness: number,
    loudness: number,
    mode: number,
    speechiness: number,
    tempo: number,
    time_signature: number,
    track_href: string,
    type: string,
    uri: string,
    valence: number,
} 