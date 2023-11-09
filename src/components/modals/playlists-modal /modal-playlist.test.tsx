import { describe, test } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import PlaylistsModal from './modal-playlist';
import PlaylistCard from './playlist-card';

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

describe('Playlist Card', () => {
    test('Render the playlist card', () => {
        const wrapper = render(<PlaylistCard
            image='mock-image'
            id='mock-id'
            name='mock-name'
            handleCallback={() => {}}
        />);

        const paper = wrapper.getByTestId('mock-playlist-card');

        fireEvent.click(paper);
    });
}) 