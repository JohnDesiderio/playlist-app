import { describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TextfieldSearchGrid from './textfield-search-grid';

describe('Tests for TextField Search Grid', () => {
    test('Textfield Search Grid Renders and looks for music', () => {
        const wrapper = render(<TextfieldSearchGrid
            executeLoadingModal={() => {}}
        />);

        const searchButton = wrapper.getByTestId('search-button');
        const searchFunction = wrapper.getByTestId('mock-search-function');
            
        expect(searchButton).toBeDisabled();

        fireEvent.change(searchFunction, { target: { value: 'Drake Nice For What' }});
    
        expect(searchButton).toBeEnabled();

        fireEvent.change(searchFunction, { target: { value: ''}})
        
        expect(searchButton).toBeDisabled(); 
    }); 
})