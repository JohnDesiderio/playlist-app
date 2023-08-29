import { getDocs } from 'firebase/firestore';
import { tracksCol } from '../../../composables/useDb';

export const getAllDocuments = async () => {
    return (await getDocs(tracksCol)).size;
}
