import { describe, test, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import ResultGridItem from './results-grid-item';
import ResultsGrid from './results-grid';
import { ITrack } from './IResultsTypes';

describe('Result Grid Item', () => {
    test('Result Grid Item Works', () => {
        const wrapper = render(<ResultGridItem
            updateMap={() => {}}
            song="Nice For What"
            album="Scorpion"
            artist="Drake"
            image="image.png"
            id='mock-id'
            uri='mock-uri'
            redirect_url='mock-uri'        
        />);
        
        const checkbox = wrapper.getByTestId('result-grid-checkbox');

        fireEvent.click(checkbox);
    })
})

describe('Results Grid', () => {
    const result: ITrack = {
        song: 'Nice For What',
        album: 'Scorpion',
        artist: 'Drake',
        id: 'mock-drake-id',
        uri: 'mock-drake-uri',
        external_url: 'mock-drake-url'
    }

    test('Enable Button and Submit Grid Item', () => {
        const wrapper = render(<ResultsGrid
            response={[result]}
            resetResponse={() => {}}
            openThankYou={() => {}}
            accessToken='mock-string'
        />);

        const submitButton = wrapper.getByTestId('results-grid-button');
        
        expect(submitButton).toBeDisabled();

        fireEvent.click( wrapper.getByTestId('result-grid-checkbox') )

        expect(submitButton).toBeEnabled();

        fireEvent.click(submitButton);

    });

    test('Enable, disable, and enable button', () => {
        const wrapper = render(<ResultsGrid
            response={[result]}
            resetResponse={() => {}}
            openThankYou={() => {}}
            accessToken='mock-string'
        />);

        const submitButton = wrapper.getByTestId('results-grid-button');
        
        expect(submitButton).toBeDisabled();

        fireEvent.click( wrapper.getByTestId('result-grid-checkbox') )

        expect(submitButton).toBeEnabled();

        fireEvent.click( wrapper.getByTestId('result-grid-checkbox') )

        expect(submitButton).toBeDisabled();

    });
})