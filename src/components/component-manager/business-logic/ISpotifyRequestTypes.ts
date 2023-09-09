export interface IUserProfile {
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean,
    },
    external_urls: {
        spotify: string,
    },
    followers: {
        href: string,
        total: number,
    },
    href: string,
    id: string, 
    images: Array<{
        url: string,
        height: number,
        width: number,
    }>,
    product: string,
    type: string,
    uri: string,
}

export interface ICreatePlaylist {
    collaborative: boolean,
    description: string,
    external_urls: Array<any>,
    followers: {
        href: string | null,
        total: number,
    },
    href: string,
    id: string, // most useful part from the playlist
}

export interface IAddTracksToPlaylist {
    snapshot_id: string,
}

export interface IOutlierDetection {
    lower_bound: number | number[],
    upper_bound: number | number[],
}