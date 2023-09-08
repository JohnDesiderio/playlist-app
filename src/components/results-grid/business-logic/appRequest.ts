import { doc, setDoc } from 'firebase/firestore';
import { tracksCol } from '../../../composables/useDb';
import { ITrack, ISpotifyDanceability } from '../IResultsTypes';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const setNewSong = async (key: string, value: ITrack, accessToken: string) => {
    const danceMetrics = (await findDanceability(accessToken, value.id))?.data;
    
    const trackRef = doc(tracksCol, key);
    return await setDoc(trackRef, {
      id: value.id,
      uri: value.uri,
      metrics: danceMetrics, 
    });
}

export const addSelectedSongs = (mappedItems: Map<string, ITrack>, accessToken: string) => {
    mappedItems.forEach((value, key) => {
        setNewSong(key, value, accessToken)
        .then()
        .catch(e => {console.log(e)});
    })
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