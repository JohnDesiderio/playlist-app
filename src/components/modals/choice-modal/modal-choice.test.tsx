import { describe, test } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import ChoiceModal from './modal-choice';

describe('Choice Modal', () => {
    test('Render choice modal', () => {
        render(<ChoiceModal
            handle_reset_modal={() => {}}
            access_token='mock-access-token'
            user_id='mock-user-id'
            exit_function={() => {}}
            loading_modal={() => {}}
            display_name='mock-display-name'
        />);
    });

    test('Create new playlists', () => {
        const wrapper = render(<ChoiceModal
            handle_reset_modal={() => {}}
            access_token='mock-access-token'
            user_id='mock-user-id'
            exit_function={() => {}}
            loading_modal={() => {}}
            display_name='mock-display-name'
        />);

        const button = wrapper.getByTestId('mock-new-playlist');
        fireEvent.click(button);
    });

    test('Select Current Playlists', () => {
        const wrapper = render(<ChoiceModal
            handle_reset_modal={() => {}}
            access_token='mock-access-token'
            user_id='mock-user-id'
            exit_function={() => {}}
            loading_modal={() => {}}
            display_name='mock-display-name'
        />);

        const button = wrapper.getByTestId('mock-current-playlists');
        fireEvent.click(button);
    });
})