import * as LeasingAPI from 'API/Leasing/API';
import { LeasingLead } from 'API/Leasing/Types';
import KeyValueTable from 'Features/Leasing/Application/Pages/KeyValueTable';
import AddGuarantorLink from 'Features/Leasing/Main/Components/AddGuarantorLink';
import GuarantorItem from 'Features/Leasing/Main/Components/GuarantorItem';
import { Form, Formik } from 'formik';
import parse from 'html-react-parser';
import { IconColors, InteractiveIcon, Pencil, Remove, Send } from 'Icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormRow } from 'Shared/Forms';
import Editor from 'Shared/Forms/Editor';
import { Text } from 'Shared/Forms/Input';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import { IconWithText, SecondaryTitle, Title } from 'Shared/PageElements';
import { Wrapper } from 'Shared/Tabs';
import { addErrorMessage, addSuccessMessage } from 'State/GlobalMessages/actionCreators';

interface Properties {
    leasingLead: LeasingLead;
}

function LeadsDetails({ leasingLead }: Properties): React.ReactElement {
    const dispatch = useDispatch();
    const history = useHistory();

    const [openEdit, setOpenEdit] = React.useState(false);
    const [showDeleteModal, toggleDeleteModal] = React.useState<boolean>(false);

    const deleteLeasingLead = async () => {
        try {
            await LeasingAPI.deleteLeasingLead(leasingLead.id);

            dispatch(addSuccessMessage('Leasing lead was successfully deleted.'));

            history.push('/leasing');
        } catch (err) {
            dispatch(addErrorMessage('Unable to delete leasing lead'));
        }
    };

    const handleResendInvitation = async (leasingLeadId, applicationId) => {
        try {
            await LeasingAPI.resendLeadInvitation(leasingLeadId, applicationId);
            dispatch(addSuccessMessage('The invitation has been sent'));
        } catch (error) {
            dispatch(addErrorMessage('Unable to send the invitation', error.message));
        }
    };

    const handleUpdateLead = async (name: string, details: string, tag: string) => {
        try {
            await LeasingAPI.updateLead(leasingLead.id, name, details, tag);
            leasingLead.name = name;
            leasingLead.details = details;
            leasingLead.tag = tag;
            dispatch(addSuccessMessage('Lead has been updated'));
        } catch (error) {
            dispatch(addErrorMessage('Unable to update lead', error));
        }
    };

    return (
        <>
            <FlexWrapper align="center" justify="between" fullWidth>
                <Title title={leasingLead.name} />
                <FlexWrapper align="end" justify="between">
                    <InteractiveIcon
                        action={() => setOpenEdit(!openEdit)}
                        active={openEdit}
                        aspect="2rem"
                        color={IconColors.BrandBlue}
                        Icon={Pencil}
                        iconAspect="1.25rem"
                    />
                    {(!leasingLead.guarantors || leasingLead.guarantors.length === 0) && (
                        <InteractiveIcon
                            aspect="2rem"
                            iconAspect="1.25rem"
                            Icon={Remove}
                            action={() => {
                                toggleDeleteModal(true);
                            }}
                            color={IconColors.WarningRed}
                        />
                    )}
                </FlexWrapper>
            </FlexWrapper>
            {openEdit ? (
                <Formik
                    initialValues={{
                        name: leasingLead.name,
                        details: leasingLead.details || '',
                        tag: leasingLead.tag || '',
                    }}
                    onSubmit={async (values) => {
                        await handleUpdateLead(values.name, values.details, values.tag);
                        setOpenEdit(false);
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormRow>
                                <Text label="MRI Opportunity" id="tag" name="tag" hideLabel fullWidth />
                                <Editor
                                    id="details"
                                    name="details"
                                    label="Details"
                                    placeholder="Enter Details"
                                    hideImageUpload
                                    hideLabel
                                />
                                <FormButtons.Submit text="Save" withMarginTop />
                            </FormRow>
                        </Form>
                    )}
                </Formik>
            ) : (
                <>
                    <KeyValueTable
                        keyValueObject={{
                            'MRI Opportunity': leasingLead.tag,
                            Details: leasingLead.details ? parse(leasingLead.details) : '',
                            Property: leasingLead.propertyName,
                            Space: leasingLead.spaceName,
                        }}
                        keyStyle={{ fontWeight: 'bold', paddingBottom: '1rem' }}
                        valueStyle={{ paddingBottom: '1rem' }}
                        tableStyle={{ marginBottom: '1rem', marginLeft: '1rem' }}
                    />
                </>
            )}
            <SecondaryTitle title="Active" />
            {leasingLead.guarantors
                ?.filter((guarantor) => guarantor.completed === false && guarantor.cancelled === false)
                .map((guarantor) => (
                    <GuarantorItem
                        key={`${guarantor.applicationId}`}
                        leadId={leasingLead.id}
                        applicationId={guarantor.applicationId}
                        name={guarantor.name}
                        email={guarantor.email}
                        cancelled={guarantor.cancelled}
                        actions={[
                            <Wrapper actionid="resend-invitation">
                                <button
                                    type="button"
                                    onClick={() => handleResendInvitation(leasingLead.id, guarantor.applicationId)}
                                    style={{ backgroundColor: 'white', border: 'none' }}
                                >
                                    <div>
                                        <IconWithText
                                            text="RESEND GUARANTOR INVITATION"
                                            Icon={Send}
                                            style={{ justifyContent: 'right' }}
                                        />
                                    </div>
                                </button>
                            </Wrapper>,
                        ]}
                    />
                ))}
            <SecondaryTitle title="Completed" />
            {leasingLead.guarantors
                ?.filter((guarantor) => guarantor.completed === true)
                .map((guarantor) => (
                    <GuarantorItem
                        key={`${guarantor.applicationId}`}
                        leadId={leasingLead.id}
                        applicationId={guarantor.applicationId}
                        name={guarantor.name}
                        email={guarantor.email}
                        cancelled={guarantor.cancelled}
                    />
                ))}
            <SecondaryTitle title="Cancelled" />
            {leasingLead.guarantors
                ?.filter((guarantor) => guarantor.cancelled === true)
                .map((guarantor) => (
                    <GuarantorItem
                        key={`${guarantor.applicationId}`}
                        leadId={leasingLead.id}
                        applicationId={guarantor.applicationId}
                        name={guarantor.name}
                        email={guarantor.email}
                        cancelled={guarantor.cancelled}
                    />
                ))}
            <AddGuarantorLink leasingLeadId={leasingLead.id} />
            {showDeleteModal && (
                <ModalWithAction
                    header="Delete Lead"
                    actionText="Delete"
                    actionCallback={deleteLeasingLead}
                    cancelCallback={() => toggleDeleteModal(false)}
                >
                    <div style={{ padding: '1rem' }}>
                        <p>Would you like to continue deleting this lead?</p>
                    </div>
                </ModalWithAction>
            )}
        </>
    );
}

export default LeadsDetails;
