import { describe, test,  } from 'vitest';
import { getAccessToken , assembleMusic } from './appRequest';


describe('Access Token Test', () => {
    test('Look up songs', async () => {
        const accessToken = (await getAccessToken())?.data.access_token;

        
        if (accessToken !== undefined) {
            await assembleMusic(
                accessToken,
                'Drake Nice for What',
                () => {},
                () => {},
            );
        }
    }); 

})