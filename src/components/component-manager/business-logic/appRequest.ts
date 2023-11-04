import { doc, getDocs, deleteDoc, getFirestore } from 'firebase/firestore';
import { tracksCol } from '../../../composables/useDb';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
    IUserProfile, 
    ICreatePlaylist, 
    IAddTracksToPlaylist, 
    IOutlierDetection 
} from './ISpotifyRequestTypes';
import { generate } from 'random-words';
import translate from 'translate';
import { track } from '../../../composables/ITrack';
import { ISpotifyAccessToken } from '../../textfield-search/business-logic/ISpotifyTypes';
import { Observable, from, filter } from 'rxjs';

// Export const to make it easier for dev env
//export const REDIRECT_URI = 'https://johndesiderio.github.io/playlist-app/';
export const REDIRECT_URI = 'http://localhost:5173/playlist-app/';

export const getAllDocuments = async (): Promise<number> => {
    return (await getDocs(tracksCol)).size;
}

export const redirectToAuthCodeFlow = async (clientId: string):Promise<void> => {
    const verifier = generateRandomString(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", REDIRECT_URI);
    params.append("scope", "playlist-modify-private playlist-modify-public user-read-private user-read-email")
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

export const getAccessToken = async (
    clientId: string,
    code: string,
):Promise<AxiosResponse<ISpotifyAccessToken> | undefined> => {
    const verifier = localStorage.getItem("verifier");
    
    const config : AxiosRequestConfig = {
        method: 'post',
        url : 'https://accounts.spotify.com/api/token',
        data: {
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier!,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    try {
        return await axios.request(config);
    } catch (e) {
        console.log(e);
    }
}

const generateRandomString = (length:number):string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghhijklmopqrstuvwxyz1234567890';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

const generateCodeChallenge = async (codeVerifier: string):Promise<string> => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const getUserProfile = async (access_token: string):Promise<AxiosResponse<IUserProfile> | undefined> => {
    const config:AxiosRequestConfig = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    }
    try {
        return await axios.request(config);
    } catch (e) {
        console.log(e);
    }
}

export const createThePlaylist = async (
        accessToken:string, 
        userId: string,
        userProfile: string,    
    ):Promise<AxiosResponse<ICreatePlaylist> | undefined> => {
        const playlistName = generate({ exactly: 3, join: ' ',  minLength: 5, maxLength: 10});
        const frenchPlaylistName = await translate(playlistName, {to: 'fr'});

        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `https://api.spotify.com/v1/users/${userId}/playlists`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                "name": frenchPlaylistName,
                "description": `A playlist belonging to ${userProfile} containing all the songs submitted to johndesiderio.github.io/playlist-app/ Thanks for mixing the songs, hope you enjoy it.`,
                "public": "true",
            }
        };

        try {
            return await axios.request(config);
        } catch (e) {
           console.log(e);
        }   
}

export const addTracksToPlaylist = async (
    accessToken: string,
    playlistId: string,
    documentId: Array<string>,
):Promise<AxiosResponse<IAddTracksToPlaylist> | undefined> => {


    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        data: {
            "uris" : documentId,
            "position": 0
        }
    };

    try {
        return await axios.request(config);
    } catch (e) {
        console.log();
    }
}

export const assembleDocIds = async ():Promise<Array<track>> => {
    const tracks = await getDocs(tracksCol)
    const trackIds = new Array<track>();

    const db = getFirestore();
    
    tracks.forEach(document => {
        trackIds.push(document.data());
        deleteDoc(doc(db, 'tracks', document.id));
    });

    return trackIds;
}

export const buildThePlaylist = async(
    accessToken: string,
    userId: string,
    displayName: string,
    setResetModal: () => void,
    handleLoadingModal: (val: boolean) => void,
):Promise<void> => {
    const playlistId = (await createThePlaylist(accessToken, userId, displayName))?.data.id; 
    const docIds = await assembleDocIds();

    if (playlistId !== undefined) {
        handleLoadingModal(true);        

        const vals = new Array<number>(); // danceability metrics used to calculate outlier boundaries

        docIds.forEach(item => {
            vals.push(item.metrics.danceability);
        })

        const bounds = findOutlierBoundaries(vals);

        const playlistSongs$ : Observable<track> = from(docIds);
        const req_body = new Array<string>();

        playlistSongs$
        .pipe(filter(track => outlierDetection(track.metrics.danceability, bounds)))
        .subscribe({
            next: (item) => {

                if (req_body.length === 100) {
                    addTracksToPlaylist(accessToken, playlistId, req_body)
                    req_body.length = 0;
                }
                
                req_body.push(item.uri);
            },
            error: () => {},
            complete: () => {
                addTracksToPlaylist(accessToken, playlistId, req_body);
            }
        });

        playlistSongs$.subscribe().unsubscribe();
        handleLoadingModal(false);
    }

    setResetModal();
} 

export const findOutlierBoundaries = (arr: Array<number>):IOutlierDetection => {
    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;

    const std = Math.sqrt(
        arr
            .reduce((acc, val) =>  acc.concat((val - mean) ** 2), [] as number[])
            .reduce((acc, val) => acc + val, 0) /
            (arr.length)
    )

    const d_v = 1; // Deviation setting to control the threshold for outliers

    const outliers: IOutlierDetection = {
        upper_bound: mean + (d_v * std) > 1 ? 1 : mean + (d_v * std),
        lower_bound: mean - (d_v * std) < 0 ? 0 : mean - (d_v * std),
    };

    return outliers;
}

//Use this for the rxjs filter possibility.
export const outlierDetection = (
    score: number,
    bounds: IOutlierDetection,
): boolean => {
    return (score < bounds.upper_bound && score > bounds.lower_bound);
}