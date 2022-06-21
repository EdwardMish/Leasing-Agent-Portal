import { Form, Formik } from 'formik';
import * as React from 'react';

import { UserAPI } from '../API';

import TermsSnippet from '../Data/Snippets/TermsSnippet';

import { Submit } from '../Shared/Forms/Button';
import Modal from 'Shared/Modal/Modal';

import { useCurrentUser } from '../State/CurrentUser/Hooks';

import styles from './termsconditions.module.css';

const TermsConditions = (): React.ReactElement => {
    const { isTenant, isCurrentUserLoaded } = useCurrentUser();

    const [termsAccepted, setTermsAccepted] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (isCurrentUserLoaded && isTenant) {
            UserAPI.getTermsAcceptedDateForCurrentUser().then((terms) => {
                setTermsAccepted(!!terms.termsAcceptedOn);
            });
        }
    }, [isCurrentUserLoaded, isTenant, termsAccepted]);

    const acceptTerms = () => {
        UserAPI.acceptTermsForCurrentUser().then(() => {
            setTermsAccepted(true);
        });
    };

    return (
        <>
            {isCurrentUserLoaded && isTenant && !termsAccepted && (
                <div>
                    <Modal header="Terms and Conditions">
                        <div className={styles.Wrapper}>
                            <Formik initialValues={{}} onSubmit={acceptTerms}>
                                {({ isSubmitting }) => (
                                    <Form className={styles.Form}>
                                        <TermsSnippet />
                                        <Submit text="Accept" disable={isSubmitting} />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default TermsConditions;
