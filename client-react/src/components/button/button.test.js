import {render, fireEvent} from '@testing-library/react';
import {Button} from './Button';
import React from "react";

describe('Button component', () => {
    it('render button', async () => {
        const {getByTestId} = render(<Button disabled={false} title={'Go to chat'}/>);
        const button = getByTestId('button');

        expect(button).toBeTruthy();
        expect(button.getAttribute('disabled')).toBeDefined();
        expect(button.getAttribute('title')).toContain('Go to');
    });

    it('is button clickable', async () => {
        let countClicked = 0;
        const {getByTestId} = render(<Button disabled={false} onClick={() => ++countClicked}/>);
        const button = getByTestId('button');

        expect(button.getAttribute('disabled')).toBeDefined();
        await fireEvent.click(button);
        expect(countClicked).toBe(1);
        await fireEvent.click(button);
        expect(countClicked).toBe(2);
    });

    it('is button not clickable', async () => {
        let countClicked = 0;
        const {getByTestId} = render(<Button disabled={true} onClick={() => ++countClicked}/>);
        const button = getByTestId('button');

        expect(button.getAttribute('disabled')).toBeDefined();
        await fireEvent.click(button);
        expect(countClicked).toBe(0);
    });
});
