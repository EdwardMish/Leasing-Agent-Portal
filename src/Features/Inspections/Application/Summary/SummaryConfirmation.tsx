import { Form, Formik } from 'formik';
import * as React from 'react';
import Modal from 'Shared/Modal/Modal';

import { Button } from '../../../../Shared/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { Submit } from '../../../../Shared/Forms/Button';

interface SummaryConfirmationProps {
    handleCancel: () => void;
    handleSubmit: () => void;
}

const SummaryConfirmation: React.FC<SummaryConfirmationProps> = ({ handleCancel, handleSubmit }): React.ReactElement => (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
            <Form>
                <Modal header="Complete Inspection" callBack={handleCancel}>
                    <div style={{ padding: '1rem' }}>
                        <p style={{ margin: '0 0 1rem', lineHeight: 1, fontWeight: 700 }}>
                            You cannot edit a completed inspection.
                        </p>
                        <p style={{ margin: '0 0 1rem', lineHeight: 1 }}>
                            Are you sure you would like to complete this inspection?
                        </p>
                        <FlexWrapper align="center" justify="between" style={{ width: '100%' }}>
                            <div style={{ width: 'calc(50% - 0.5rem)', paddingRight: '.5rem' }}>
                                <Button text="Cancel" withMarginTop callback={handleCancel} inverse fullWidth />
                            </div>
                            <div style={{ width: 'calc(50% - 0.5rem)', paddingLeft: '.5rem' }}>
                                <Submit text="Complete" withMarginTop fullWidth disable={isSubmitting} />
                            </div>
                        </FlexWrapper>
                    </div>
                </Modal>
            </Form>
        )}
    </Formik>
);

export default SummaryConfirmation;

