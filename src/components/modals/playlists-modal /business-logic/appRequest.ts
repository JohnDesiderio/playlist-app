/**
 * This file will be moved to a new a directory inside the modal folder to account
 * for users who want to add the songs from the database into an existing playlist
 * on the Spotify account.
 */
import axios, { AxiosRequestConfig, AxiosResponse} from "axios";
import { IPlaylistResponse } from "./IPlaylistTypes";
import { addTracksToPlaylist, assembleDocIds, outlierDetection, findOutlierBoundaries } from '../../../component-manager/business-logic/appRequest';
import { Observable, from, filter } from "rxjs";
import { track } from "../../../../composables/ITrack";

export const gatherPlaylists = async (
    access_token: string,
    user_id: string,
):Promise<AxiosResponse<IPlaylistResponse> | undefined> => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        data: {
            limit: '10',
            offset: '0',
        }
    }

    try {
        return await axios.request(config);
    } catch (e) {
        console.log(e);
    }
}

export const placeTracksInPlaylist = async (
    playlistIds: Array<string>,
    access_token: string,
    loading_modal: (bool: boolean) => void,
) => {
    loading_modal(true);
    const docIds = await assembleDocIds();

    const vals = new Array<number>;

    docIds.forEach(item => {
        vals.push(item.metrics.danceability);
    });

    const bounds = findOutlierBoundaries(vals);

    const playlistSongs$ : Observable<track> = from(docIds);
    const req_body = new Array<string>();

    playlistSongs$
    .pipe(filter(track => outlierDetection(track.metrics.danceability, bounds)))
    .subscribe({
        next: (item) => {

            if (req_body.length === 100) {
                playlistIds.forEach(playlist_id => {
                    addTracksToPlaylist(access_token, playlist_id, req_body);
                });
                req_body.length = 0; 
            }
            
            req_body.push(item.uri);
        },
        error: () => {},
        complete: () => {
            playlistIds.forEach(playlist_id => {
                addTracksToPlaylist(access_token, playlist_id, req_body);
            });
        },
    });

    playlistSongs$.subscribe().unsubscribe();
    loading_modal(false);
}