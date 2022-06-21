import * as React from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import UserAPI from '../../../API/Users';

import { currentUserId } from '../../../State/CurrentUser/selectors';

import { Phone, PhoneType } from '../../../Types/User';

import { Button } from '../../../Shared/Button';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { FormButtons, FormInputs, FormRow } from '../../../Shared/Forms';
import { TELEPHONE_REGEXP } from '../../../utils/formatPhone';

interface PhoneListProps {
    cancel: () => void;
    refresh: () => void;
    phoneNumbers: Phone[];
}

const EditPhoneList: React.FC<PhoneListProps> = ({ cancel, refresh, phoneNumbers }) => {
    const userId: number = useSelector(currentUserId);

    const getNumberByType = (type: PhoneType): string =>
        phoneNumbers.find(({ phoneType }) => phoneType === type)?.phoneNumber || '';

    const [currentHome, setCurrentHome] = React.useState<string>(getNumberByType(PhoneType.Home));
    const [currentMobile, setCurrentMobile] = React.useState<string>(getNumberByType(PhoneType.Mobile));
    const [currentOffice, setCurrentOffice] = React.useState<string>(getNumberByType(PhoneType.Office));

    React.useEffect(() => {
        setCurrentHome(getNumberByType(PhoneType.Home));
        setCurrentMobile(getNumberByType(PhoneType.Mobile));
        setCurrentOffice(getNumberByType(PhoneType.Office));
    }, [phoneNumbers]);

    const handlePhoneNumbers = async ({ home, mobile, office }) => {
        if (home !== currentHome || mobile !== currentMobile || office !== currentOffice) {
            if (home !== currentHome) {
                if (home) {
                    await UserAPI.updateUserPhone(userId, PhoneType.Home, home);
                } else {
                    await UserAPI.deleteUserPhone(userId, PhoneType.Home);
                }
            }

            if (mobile !== currentMobile) {
                if (mobile) {
                    await UserAPI.updateUserPhone(userId, PhoneType.Mobile, mobile);
                } else {
                    await UserAPI.deleteUserPhone(userId, PhoneType.Mobile);
                }
            }

            if (office !== currentOffice) {
                if (office) {
                    await UserAPI.updateUserPhone(userId, PhoneType.Office, office);
                } else {
                    await UserAPI.deleteUserPhone(userId, PhoneType.Office);
                }
            }

            refresh();
        } else cancel();
    };

    return (
        <Formik
            enableReinitialize
            validateOnMount
            initialValues={{
                home: currentHome,
                mobile: currentMobile,
                office: currentOffice,
            }}
            onSubmit={(values) => {
                handlePhoneNumbers(values);
            }}
            validationSchema={Yup.object({
                home: Yup.string()
                    .notRequired()
                    .matches(new RegExp(TELEPHONE_REGEXP), 'Please enter a valid home phone number'),
                mobile: Yup.string()
                    .notRequired()
                    .matches(new RegExp(TELEPHONE_REGEXP), 'Please enter a valid mobile phone number'),
                office: Yup.string()
                    .notRequired()
                    .matches(new RegExp(TELEPHONE_REGEXP), 'Please enter a valid office phone number'),
            })}
        >
            {({ isSubmitting, isValid, isValidating }) => (
                <Form style={{ width: '100%', margin: '0.75rem 0 0' }}>
                    <FormRow withMargin>
                        <FormInputs.Telephone id="home" name="home" label="Home Phone" />
                    </FormRow>
                    <FormRow withMargin>
                        <FormInputs.Telephone id="mobile" name="mobile" label="Mobile Phone" />
                    </FormRow>
                    <FormRow withMargin>
                        <FormInputs.Telephone id="office" name="office" label="Office Phone" />
                    </FormRow>
                    <FlexWrapper
                        align="center"
                        justify="end"
                        style={{
                            margin: '0 0 1rem',
                        }}
                    >
                        <Button text="Cancel" callback={cancel} inverse style={{ marginRight: '0.5rem' }} />
                        <FormButtons.Submit text="Save Changes" disable={isSubmitting || !isValid || isValidating} />
                    </FlexWrapper>
                </Form>
            )}
        </Formik>
    );
};

export default EditPhoneList;
