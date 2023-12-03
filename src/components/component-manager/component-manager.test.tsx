import { describe, test } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ComponentManagerGrid from './component-manager';

describe('Component manager tests', () => {
    test('Render Component Manager', () => {
        const wrapper = render(<ComponentManagerGrid/>);

        const aboutButtonOpenModal = wrapper.getByTestId('mock-about-button');

        fireEvent.click(aboutButtonOpenModal);

        const aboutButtonCloseModal = wrapper.getByTestId('mock-about-button-close');

        fireEvent.click(aboutButtonCloseModal);
        
        const openMixSongsModal = wrapper.getByTestId('mock-mix-songs-button');

        fireEvent.click(openMixSongsModal);
    })
})