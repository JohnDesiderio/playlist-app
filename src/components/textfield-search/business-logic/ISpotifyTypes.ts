export interface ISpotifyAccessToken {
    access_token: string,
    token_type: string,
    expires_in: number,
}

interface IArtist {
    name: string,
}

interface IImageUrl {
    url: string,
}

export interface ISpotifyTrack {
    id: string,
    album: {
        name: string,
        artists: Array<IArtist>,
        images: Array<IImageUrl>,
        uri: string,
    },
    name: string,
    uri: string,
    external_urls: {
        spotify: string,
    },
}

export interface ISpotifyResponse {
    tracks: {
        items: Array<ISpotifyTrack>
    }
}