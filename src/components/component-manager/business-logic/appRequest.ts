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
import { track } from '../../../composables/ITrack';
import percentile from 'percentile';

const REDIRECT_URI = 'https://johndesiderio.github.io/playlist-app/'

export const getAllDocuments = async () => {
    return (await getDocs(tracksCol)).size;
}

export async function redirectToAuthCodeFlow(clientId: string) {
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

export async function getAccessToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code_verifier", verifier!);


    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    const { access_token } = await result.json();
    return access_token;
}

function generateRandomString(length:number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghhijklmopqrstuvwxyz1234567890';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
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

        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `https://api.spotify.com/v1/users/${userId}/playlists`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                "name": playlistName,
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
    documentId: string,
):Promise<AxiosResponse<IAddTracksToPlaylist> | undefined> => {


    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        data: {
            "uris" : [documentId],
            "position": 0
        }
    };

    try {
        return await axios.request(config);
    } catch (e) {
        console.log();
    }
}

export const assembleDocIds = async ():Promise<Set<track>> => {
    const tracks = await getDocs(tracksCol)
    const trackIds = new Set<track>();

    const db = getFirestore();
    
    tracks.forEach(document => {
        trackIds.add(document.data());
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

        const vals = new Set<number>();

        docIds.forEach(item => {
            vals.add(item.metrics.danceability);
        })

        const bounds = findOutlierBoundaries(Array.from(vals.values()));

        for await (const document of docIds) {
            const dance = document.metrics.danceability;
            if (typeof bounds.upper_bound === 'number' && typeof bounds.lower_bound === 'number') {
                console.log('Got here lets goo');

                if (dance < bounds.upper_bound && dance > bounds.lower_bound)  
                    await addTracksToPlaylist(accessToken, playlistId, document.uri)
                        .catch(error => {
                            console.log(error);
                        });
            } 
        }
        handleLoadingModal(false);
    }

    setResetModal();
} 

const findOutlierBoundaries = (arr: Array<number>):IOutlierDetection => {
    const u_b = percentile(75, arr);
    const l_b = percentile(25, arr);


    const outliers: IOutlierDetection = {
        upper_bound: u_b,
        lower_bound: l_b,
    };

    return outliers;
}