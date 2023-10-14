import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ISpotifyResponse, ISpotifyAccessToken, ISpotifyTrack } from './ISpotifyTypes';
import { ISpotifyDanceability, ITrack } from '../../results-grid/IResultsTypes';
import { Observable, mergeMap } from 'rxjs';

/**
 * Simple authorization request to get permission to call 
 * Spotify API to search for a track and retrieve 
 * Spotify song analysis metrics
 * @returns {Promise<AxiosResponse<ISpotifyResponse> | undefined>} - a response containing the Spotify Access Token
 */
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

/**
 * The function creates an observable based on the results from the items array in the Spotify response
 * @param {string} accessToken - The token obtained from the Promise in getAccessToken()
 * @param {string} query - The user input from the textfield search component
 * @returns {Observable<ISpotifyTrack>} An observable
 */
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
            r.data.tracks.items.forEach((track) => {
                observer.next(track);
            })
            observer.complete();
        })
        .catch((e : any) => {
            observer.error(e);
        })

        return () => {
            
        }
    })
}

/**
 * Request the Spotify API for the metrics on specific tracks.
 * @param {string} accessToken - The token obtained from the Promise in getAccessToken()
 * @param {ISpotifyTrack} track - The track structure containing relevant artist metadata
 * @returns {Observable<ITrack>} - An observable that contains the Axios Request for Spotify
 * song analysis on the track variable
 */
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
            const moldedTrack: ITrack = {
                song: track.name,
                album: track.album.name,
                artist: track.album.artists.at(0)?.name,
                image: track.album.images.at(2)?.url,
                id: track.id,
                uri: track.uri,
                external_url: track.external_urls.spotify,
                metrics: r.data,
            }
            observer.next(moldedTrack);
            observer.complete();
        })
        .catch((e : any) => {
            observer.error(e);
        });

        return () => {

        }
    })
}

/**
 * A void function that invokes a pause modal that does not close
 * until requests complete or an error happes within the code.
 * TODO: Implement an error modal declaring something didn't work.
 * @param {string} access_token - The token obtained from the Promise in getAccessToken()
 * @param {string} query - The user input from the textfield search component
 * @param {(bool: boolean) => void} handleLoadingModal - callback function to open and close the loading modal
 * @param {(songs: Array<ITrack> | undefined) => void} setResponse - callback functions to set new state upon modal finish loading
 */
export const assembleMusic = (
    access_token: string, 
    query: string,
    handleLoadingModal: (bool: boolean) => void,
    setResponse: (songs: Array<ITrack> | undefined) => void,
) => {
    handleLoadingModal(true);

    const songs$: Observable<ISpotifyTrack> = getSearchResults(access_token, query);

    const songResults = new Array<ITrack>();

    const newStateData$: Observable<ITrack> = songs$.pipe(
        mergeMap(song => findDanceability(access_token, song)),
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
        },
    })
    
    newStateData$.subscribe().unsubscribe();
}