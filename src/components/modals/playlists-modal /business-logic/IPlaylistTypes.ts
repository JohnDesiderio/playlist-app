export interface IPlaylistModal {
    access_token: string | undefined,
    user_id: string | undefined,
    reset_modal: () => void,
    loading_modal: (bool: boolean) => void,
}

export interface IPlaylistCard {
    image: string | undefined,
    id: string,
    name: string,
    handleCallback: (id: string) => void,
}

export interface IPlaylistResponse {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: Array<{
        collaborative: boolean,
        description: string,
        external_urls: {
            spotify: string,
        },
        href: string,
        id: string,
        images: Array<{
            url: string,
            height: number,
            width: number,
        }>,
        name: string,
        owner: {
            external_urls: {
                spotify: string,
            },
            followers: {
                href: string,
                total: number,
            },
            href: string,
            id: string,
            type: string,
            uri: string,
            display_name: string | null,
        },
        public: boolean,
        snapshot_id: string,
        tracks: {
            href: string,
            total: number,
        },
        type: string,
        uri: string,
    }>,
}