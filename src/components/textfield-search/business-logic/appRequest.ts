import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ISpotifyResponse, ISpotifyAccessToken, ISpotifyTrack } from './ISpotifyTypes';
import { ISpotifyDanceability, ITrack } from '../../results-grid/IResultsTypes';
import { Observable, mergeMap } from 'rxjs';

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

export const getSearchResults = (
    accessToken: string,
    query: string,
):Observable<ISpotifyTrack> => {
    const config: AxiosRequestConfig = {
        url: `https://api.spotify.com/v1/search?q=${query.replaceAll(/ +/g, '+')}&type=track&market=US&limit=10`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }

    return new Observable(observer => {
        axios.request(config)
        .then((r: AxiosResponse<ISpotifyResponse>) => {
            return r.data;
        })
        .then((data) => {
            data.tracks.items.forEach((track) => {
                observer.next(track);
            })
            observer.complete();
        })
        .catch((e : any) => {
            observer.error(e);
        })

        return () => {
            // clean up the unsubscribe method idk how yet
        }
    })
}

export const findDanceability = (
    accessToken: string,
    track: ISpotifyTrack,
):Observable<ITrack> => {
    const config : AxiosRequestConfig = {
        method: 'GET',
        url: `https://api.spotify.com/v1/audio-features/${track.id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }

    return new Observable<ITrack>(observer => {
        axios.request(config)
        .then((r: AxiosResponse<ISpotifyDanceability>) => {
            return r.data;
        })
        .then((data) => {
            const moldedTrack: ITrack = {
                song: track.name,
                album: track.album.name,
                artist: track.album.artists.at(0)?.name,
                image: track.album.images.at(2)?.url,
                id: track.id,
                uri: track.uri,
                external_url: track.external_urls.spotify,
                metrics: data,
            }
            observer.next(moldedTrack);
            observer.complete();
        })
        .catch((e : any) => {
            observer.error(e);
        });

        return () => {
            // Clean up the unsubscribe somehow
        }
    })
}

export const assembleMusic = async (
    access_token: string, 
    query: string,
    handleLoadingModal: (bool: boolean) => void,
    setResponse: (songs: Array<ITrack> | undefined) => void,
) => {

    const songs$: Observable<ISpotifyTrack> = getSearchResults(access_token, query);

    handleLoadingModal(true);


    const songResults = new Array<ITrack>();

    const newStateData$: Observable<ITrack> = songs$.pipe(
        mergeMap(song => findDanceability(access_token, song))
    )

    newStateData$.subscribe({
        next(x: ITrack) {
            songResults.push(x);
        },
        error(err: any) {
            console.error(err);
            setResponse(undefined);
            handleLoadingModal(false);
        }, 
        complete() {
            setResponse(songResults)
            handleLoadingModal(false);
        }
    });
}