import { useEffect } from 'react';
import { doc, setDoc, getDocs, deleteDoc, getFirestore } from 'firebase/firestore';
import { tracksCol } from './composables/useDb';
import LandingPage from './components/landing-page/landing-page';

const setNewSong = async () => {
  const trackRef = doc(tracksCol, 'test_item');
  return await setDoc(trackRef, {
    song: 'It is What It Is',
    artist: 'Blood Orange',
    album: 'Cupid Deluxe',
    id: 'idk this yet',
  })

  /*
    example of how to call in a function
    setNewSong()
    .then(() => {
      console.log('Successful');
    })
    .catch((error) => {
      console.log(`Unsuccessful returned error ${error}`);
    });
    */
}

const getAllDocuments = async () => {
  return await getDocs(tracksCol);
  
  /*
    example of how to call the information inside a useEffect
    const info = getAllDocuments();
    info.then(track => {
      track.docs.forEach(info => {
        console.log(info.data())
      });
    })
  */
}

const deleteTrack = async () => {
  const firestore = getFirestore();
  const docRef = doc(firestore, 'tracks', '3CA9pLiwRIGtUBiMjbZmRw');
  return await deleteDoc(docRef);

  /** 
    example of how to call the function in the useEffect
    deleteTrack()
    .then(() => {
      console.log('Great Success');
    })
    .catch((error) => {
      console.log(`Uh oh, error: ${error}`);
    })
  */

}

export default function App() {

  return (
    <LandingPage/>
  )
}
