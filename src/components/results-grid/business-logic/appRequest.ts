import { doc, setDoc } from 'firebase/firestore';
import { tracksCol } from '../../../composables/useDb';
import { ITrack } from '../IResultsTypes';

export const setNewSong = async (key: string, value: ITrack) => {
    const trackRef = doc(tracksCol, key);
    return await setDoc(trackRef, {
      song: value.song,
      artist: value.artist,
      album: value.album,
      id: value.id,
    });
}

export const addSelectedSongs = (mappedItems: Map<string, ITrack>) => {
    mappedItems.forEach((value, key) => {
        setNewSong(key, value)
        .then()
        .catch(e => {console.log(e)});
    })
}