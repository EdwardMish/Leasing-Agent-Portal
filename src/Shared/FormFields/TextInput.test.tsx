import * as React from 'react';
import { render } from '@testing-library/react';

import { TextInput } from './TextInput';

describe('Component: TextInput', () => {
    const baseProps = {
        formFieldId: 'text-input-test',
        inputValidation: {
            applicableStates: [],
        },
        label: 'text-input-labe',
        name: 'text-input-test',
    };

    it('renders', () => {
        const { asFragment } = render(<TextInput {...baseProps} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
