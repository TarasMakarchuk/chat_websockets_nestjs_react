import { render } from '@testing-library/react';
import { Message } from './Message';
import React from "react";

describe('Message component', () => {
    it('render button', () => {
        const { getByTestId } = render(<Message item={{ name: 'user', index: 0 }}/>);
        const message = getByTestId('message');

        expect(message).toBeTruthy();
    });
});



