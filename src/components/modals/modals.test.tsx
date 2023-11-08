import { describe, test, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import LoadingModal from './modal-loading';
import AboutModal from './modal-about';
import ThankYouModal from './modal-thank-you';
import ResetSiteModal from './modal-reset-site';
import EmptyModal from './modal-empty-col';

describe('Loading Modal', () => {
    test('Loading Modal appears', () => {
        const wrapper = render(<LoadingModal/>);
        expect(wrapper).toBeTruthy();
    });
})

describe('About Modal', () => {
    test('About Modal appears', () => {
        const wrapper = render(<AboutModal exit_function={() => {}}/>);
        expect(wrapper).toBeTruthy();
    });
})

describe('Thank You Modal', () => {
    test('Thank You Modal appears', () => {
        const wrapper = render(<ThankYouModal exit_function={() => {}}/>);
        expect(wrapper).toBeTruthy();

        const button = wrapper.getByTestId('button');
        expect(button).toBeEnabled();
        fireEvent.click(button);
        
    });
})

describe('Reset Site Modal', () => {
    test('Reset Modal Appears', () => {
        const wrapper = render(<ResetSiteModal/>);
        expect(wrapper).toBeTruthy();

wrapper.getByTestId('button');
    })
})

describe('Empty Firebase Modal', () => {
    test('Empty Modal Appears', () => {
        const wrapper = render(<EmptyModal exit_function={() => {}}/>)
        expect(wrapper).toBeTruthy();


    })
})