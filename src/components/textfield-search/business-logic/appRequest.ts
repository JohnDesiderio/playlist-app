import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ISpotifyResponse, ISpotifyAccessToken } from './ISpotifyTypes';
import { ISpotifyDanceability, ITrack } from '../../results-grid/IResultsTypes';
import { Subject, Observable } from 'rxjs';

export const getAccessToken = async ():Promise<AxiosResponse<ISpotifyAccessToken> | undefined> => {
    const config:AxiosRequestConfig = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: {
            'grant_type': 'client_credentials',
            'client_id': '9dc3cfe6f686431f878571165c601f37',
            'client_secret': 'dd98e7ae45ce43bd9b032ba007a0f5c7',
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    try {
        return await axios.request(config);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getSearchResults = async (
    accessToken: string,
    query: string,
):Promise<AxiosResponse<ISpotifyResponse> | undefined> => {
    const config: AxiosRequestConfig = {
        url: `https://api.spotify.com/v1/search?q=${query.replaceAll(/ +/g, '+')}&type=track&market=US&limit=10`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }
    try {
        return await axios.request(config)
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const findDanceability = async(
    accessToken: string,
    track_id: string,
):Promise<AxiosResponse<ISpotifyDanceability> | undefined> => {
    const config : AxiosRequestConfig = {
        method: 'GET',
        url: `https://api.spotify.com/v1/audio-features/${track_id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }

    try {
        return await axios.request(config);
    } catch (e) {
        console.log(e);
    }
}

export const assembleMusic = async (
    access_token: string, 
    query: string,
):Observable<ITrack> => {
    const subject = new Subject<ITrack>();
    const observable = subject.asObservable();

    const observer = async () => {
        const spotifyResponse = await getSearchResults(access_token, query);

        if (spotifyResponse?.data.tracks.items != undefined) {
            for await (const track of spotifyResponse.data.tracks.items) {
                const songData = await findDanceability(access_token, track.id);

                if (songData?.data !== undefined) {
                    const moldedSong: ITrack = {
                        song: track.name,
                        album: track.album.name,
                        artist: track.album.artists.at(0)?.name,
                        image: track.album.images.at(0)?.url,
                        id: track.id,
                        uri: track.uri,
                        metrics: songData.data,
                    }
                    subject.next(moldedSong);
                }
            }
        }

    }

    observer();
    return observable;
}