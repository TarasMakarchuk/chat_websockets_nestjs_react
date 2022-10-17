import { render } from '@testing-library/react';
import { Input } from './Input';
import React from "react";

describe('Input component', () => {
    it('render input', () => {
        const { getByTestId } = render(<Input placeholder={'Input'} />);
        const input = getByTestId('input-text');

        expect(input).toBeTruthy();
    });
});



