import React from 'react';

import { FormInputs } from '../../Shared/Forms';
import { FormRow } from '../../Shared/Forms';

const FullPageForm = ({}) => {
    return (
        <FormRow>
            <FormInputs.Text label="Document label" id="nickname" name="nickname" required fullWidth />
        </FormRow>
    );
};

export default FullPageForm;
