import { describe, test } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import PlaylistsModal from './modal-playlist';

describe('Playlists Modal', () => {
    test('Render Playlists Modal', () => {
        render(<PlaylistsModal
            exit_function={() => {}}
            access_token='mock-access-token'
            user_id='mock-user-id'
            reset_modal={() => {}}
            loading_modal={() => {}}
        />)
    })
})