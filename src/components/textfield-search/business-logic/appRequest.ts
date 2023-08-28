import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ISpotifyResponse, ISpotifyAccessToken } from './ISpotifyTypes';

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