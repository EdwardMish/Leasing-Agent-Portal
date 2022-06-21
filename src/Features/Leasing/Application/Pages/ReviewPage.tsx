import { Bureau } from 'API/Leasing/Types';
import EquifaxError from 'Features/Leasing/Application/Components/EquifaxError';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormInputs, FormRow } from 'Shared/Forms';
import Thumbnail from 'Shared/Forms/Input/UploadFile/Thumbnail';
import { loremIpsum } from 'Shared/Forms/Mock/loremIpsum';
import { Description, DisclaimerText, Divider, Title, ModalMarquee } from 'Shared/PageElements';
import { globalMessageActionCreators } from 'State';
import { useLeasingState } from 'State/Leasing/Hooks';
import { Address, IdentificationType, PersonalInformation } from 'State/Leasing/Types';
import { formatDate } from 'utils';
import * as Yup from 'yup';
import KeyValueTable from './KeyValueTable';
import styles from './personal-information-page.module.css';
import ReviewPanel from './ReviewPanel';
import { LeasingActionTypes, LeasingActions } from 'State/Leasing/actions';

interface ReviewPagePropsType {
    next: string;
    previous: string;
    personalInformation?: PersonalInformation;
    address: Address | undefined;
    identification: IdentificationType;
    personalInformationLink: string;
    identificationLink: string;
    addressLink: string;
}

const ReviewPage = ({
    next,
    previous,
    personalInformation,
    address,
    identification,
    personalInformationLink,
    identificationLink,
    addressLink,
}: ReviewPagePropsType): React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { startApplication } = useLeasingState();

    const [showMarquee, setShowMarquee] = useState(false);
    const [isSuccess, setShowIsSuccess] = useState(false);
    const [bureauInfo, setBureauInfo] = React.useState<Bureau | undefined>(undefined);

    const goBackHandler = () => (previous ? history.push(previous) : history.goBack());

    const submitHandler = async (values, helpers: FormikHelpers<any>) => {
        try {
            setShowMarquee(true);

            const response = await startApplication();

            //If response is success, the Markee must only show the option Success!

            if (response.creditCheckSuccessful === false) {
                setBureauInfo(response.bureau);
                helpers.setSubmitting(false);
                setShowIsSuccess(false);
                setShowMarquee(false);
            } else {
                setShowIsSuccess(true);
            }
        } catch (error) {
            setShowIsSuccess(false);
            setShowMarquee(false);
            dispatch(
                globalMessageActionCreators.addErrorMessage(
                    'Sorry we were unable to send you application information, please review your data',
                ),
            );
        }
    };

    const handleNextStep = () => {
        dispatch({
            type: LeasingActions.SET_START_APPLICATION,
        } as LeasingActionTypes);

        setShowMarquee(false);
        history.push(next);
    };

    const confirmInitialValues = { confirmVeracity: false };

    const validationSchema = Yup.object({
        confirmVeracity: Yup.boolean()
            .required('You must check the box to confirm.')
            .isTrue('You must check the box to confirm.'),
    });

    const StateIdentificationPanel = () => (
        <FlexWrapper wrap justify="between" align="start">
            <KeyValueTable
                keyStyle={{ width: '8rem', color: 'gray' }}
                tableStyle={{ marginRight: '2rem' }}
                keyValueObject={{
                    Type: 'State Identification',
                    'Id Number': identification.identificationNumber,
                    State: identification.stateOfIssue,
                    Expiration: formatDate(identification.stateIdExpirationDate),
                }}
            />

            <Thumbnail
                id="thumbnail-attachment-idFront"
                alt={identification.uploadIdFront?.name}
                name={decodeURI(identification.uploadIdFront?.name)}
                src={identification.uploadIdFront?.url}
                style={{
                    width: '8rem',
                    height: 'auto',
                    marginRight: '2rem',
                }}
            />
            {identification.uploadIdBack && (
                <Thumbnail
                    id="thumbnail-attachment-idBack"
                    alt={identification.uploadIdBack.name}
                    name={decodeURI(identification.uploadIdBack?.name)}
                    src={identification.uploadIdBack.url}
                    style={{ width: '8rem', height: 'auto' }}
                />
            )}
        </FlexWrapper>
    );

    const PassportIdentificationPanel = () => (
        <FlexWrapper wrap justify="between" align="start">
            <KeyValueTable
                tableStyle={{ marginRight: '2rem' }}
                keyStyle={{ width: '8rem', color: 'gray' }}
                valueStyle={{ marginRight: '2rem' }}
                keyValueObject={{
                    Type: 'Passport Identification',
                    Passport: identification.passportNumber,
                    Expiration: formatDate(identification.passportExpirationDate),
                }}
            />

            <Thumbnail
                id="thumbnail-attachment-idPassport"
                alt={identification.uploadPassportId?.name}
                name={decodeURI(identification.uploadPassportId?.name)}
                src={identification.uploadPassportId?.url}
                style={{
                    width: '8rem',
                    height: 'auto',
                    marginRight: '2rem',
                }}
            />
        </FlexWrapper>
    );

    const marqueeContent = [
        'Securing Connection with Server',
        'Saving Personal Information',
        'Saving Address Information',
        'Saving Identity Information',
        'Contacting Equifax',
        'Connection Established',
        'Securing Credit Report',
        'Confirming Lease Application Information',
        'Waiting',
    ];

    const successMarqueeContent = ['Success!'];

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <ModalMarquee
                    showModal={showMarquee}
                    content={isSuccess ? successMarqueeContent : marqueeContent}
                    title="Thank you for submitting your application"
                    seconds={2.5}
                    buttonText="NEXT STEPS"
                    showButton={isSuccess}
                    disableButton={!isSuccess}
                    onClickButtonHandler={handleNextStep}
                    icon={isSuccess ? 'checkMark' : 'spinningLoader'}
                />

                <Title title="Confirmation" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>
                        Please review the information below and make any changes if necessary. Once complete, please
                        acknowledge that the information you provided is accurate.
                    </Description>
                </div>
                <Divider />
                <ReviewPanel title="Personal Information" editLink={personalInformationLink}>
                    {!!personalInformation && (
                        <KeyValueTable
                            keyStyle={{ width: '8rem', color: 'gray' }}
                            keyValueObject={{
                                Name: `${personalInformation.firstName} ${personalInformation.lastName}`,
                                Phone: personalInformation.phone,
                                'Date Of Birth': formatDate(personalInformation.dateOfBirth),
                                SSN: personalInformation.socialSecurityNumber,
                            }}
                        />
                    )}
                </ReviewPanel>

                <ReviewPanel title="Address" editLink={addressLink}>
                    {!!address && (
                        <KeyValueTable
                            keyStyle={{ width: '8rem', color: 'gray' }}
                            keyValueObject={{
                                'Address 1': address?.street,
                                'Address 2': address?.street2,
                                City: address?.city,
                                State: address?.state,
                                'Zip Code': address?.zip,
                            }}
                        />
                    )}
                </ReviewPanel>

                <ReviewPanel title="Identification" editLink={identificationLink}>
                    {!!identification &&
                        (identification.stateOfIssue ? <StateIdentificationPanel /> : <PassportIdentificationPanel />)}
                </ReviewPanel>

                <Formik
                    initialValues={confirmInitialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                    isInitialValid={false}
                >
                    {({ isSubmitting, isValid }) => (
                        <Form>
                            <FormRow>
                                <FormInputs.CheckBox
                                    id="confirmVeracity"
                                    name="confirmVeracity"
                                    display="I hereby declare that the information provided is true and correct."
                                    required
                                />
                            </FormRow>
                            {bureauInfo && <EquifaxError bureauInfo={bureauInfo} />}
                            <FormRow>
                                <FlexWrapper align="center" justify="between">
                                    <Button text="Back" callback={goBackHandler} inverse />
                                    <FormButtons.Submit text="Submit" disable={isSubmitting || !isValid} />
                                </FlexWrapper>
                            </FormRow>
                        </Form>
                    )}
                </Formik>

                <DisclaimerText disclaimerText={`Legal Disclaimer ${loremIpsum}`} footerText />
            </main>
        </ApplicationPageWrapper>
    );
};

export default ReviewPage;
