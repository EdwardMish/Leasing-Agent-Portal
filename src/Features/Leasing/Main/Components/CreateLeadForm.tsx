import { API as LeasingAPI } from 'API/Leasing';
import { ErrorMessage, Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormButtons, FormInputs, FormRow } from 'Shared/Forms';
import Editor from 'Shared/Forms/Editor';
import formStyles from 'Shared/Forms/forms.module.css';
import { Hidden, Text } from 'Shared/Forms/Input';
import { Title } from 'Shared/PageElements';
import Description from 'Shared/PageElements/Description';
import { DropDownSelector, useSinglePropertySelection } from 'Shared/PropertyTenantResolution/SingleProperty';
import { addErrorMessage } from 'State/GlobalMessages/actionCreators';
import * as Yup from 'yup';
import styles from './create.module.css';
import useSinglePropertySpaceSelection from 'Shared/PropertyTenantResolution/SingleSpace/useSinglePropertySpaceSelection';

interface FormValues {
    propertyId: number;
    spaceId: number;
    name: string;
    details?: string;
    tag?: string;
}

const CreateLeadForm: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [
        availableProperties,
        selectedPropertyId,
        visibleProperties,
        selectProperty,
        searchProperties,
        propertiesAreLoaded,
    ] = useSinglePropertySelection();

    const { spaces, getSpaces, selectedSpaceId, selectSpaceId, visibleSpaces, searchSpaces } =
        useSinglePropertySpaceSelection();

    const createLead = async (propertyId: number, spaceId: number, name: string, details?: string, tag?: string) => {
        try {
            const leadId = await LeasingAPI.createLeasingLead(propertyId, spaceId, name, details, tag);
            history.push(`/leasing/leads/${leadId}`);
        } catch (error) {
            dispatch(addErrorMessage(`Unable to create a new leasing lead. ${error}`));
        }
    };

    return (
        <div className={styles.NewRequestForm}>
            <Title title="Create Lead" />
            <Description>
                Please select the property and provide a name to help identify this lead.
                <br /> You may provide additional details and opportunity id for further describing this lead.
            </Description>
            <Formik
                initialValues={
                    {
                        propertyId: 0,
                        spaceId: 0,
                        name: '',
                    } as FormValues
                }
                onSubmit={(values) => {
                    createLead(values.propertyId, values.spaceId, values.name, values.details, values.tag);
                }}
                validationSchema={Yup.object({
                    propertyId: Yup.number()
                        .required('A property must be selected')
                        .moreThan(0, 'A property must be selected'),
                    spaceId: Yup.number().required('An space must be selected').moreThan(0, 'An space must be selected'),
                    name: Yup.string()
                        .required('A name is required')
                        .min(3, 'Name is too short')
                        .max(100, 'Name is too long'),
                    details: Yup.string().min(10, 'Detail is too short').max(4000, 'Detail is too long'),
                    tag: Yup.string().max(4000, 'Detail is too long'),
                })}
                isInitialValid={false}
            >
                {({ isSubmitting, isValid, setFieldValue }) => (
                    <Form style={formStyles}>
                        <FormRow>
                            <DropDownSelector
                                availableOptions={availableProperties}
                                selectedOptionId={selectedPropertyId}
                                visibleOptions={visibleProperties}
                                searchHandler={searchProperties}
                                selectOptionHandler={(propertyId: number) => {
                                    setFieldValue('propertyId', propertyId);
                                    selectProperty(propertyId);
                                    getSpaces(propertyId);
                                    selectSpaceId(-1);
                                    setFieldValue('spaceId', -1); // it resets the selected space if the user choose another property
                                }}
                                loaded={propertiesAreLoaded}
                            />

                            <DropDownSelector
                                availableOptions={spaces}
                                selectedOptionId={selectedSpaceId}
                                visibleOptions={visibleSpaces}
                                searchHandler={searchSpaces}
                                selectOptionHandler={(spaceId: number) => {
                                    setFieldValue('spaceId', spaceId);
                                    selectSpaceId(spaceId);
                                }}
                                loaded={propertiesAreLoaded}
                                searchPlaceholder="Search Spaces"
                                loadingMessage="Loading Spaces"
                                headerType="Space"
                            />

                            <Hidden id="propertyId" name="propertyId" label="Property" required />

                            <Hidden id="spaceId" name="spaceId" label="Space" required />
                            <ErrorMessage name="propertyId" />
                        </FormRow>
                        <FormRow>
                            <FormInputs.Text id="name" name="name" label="Business Name" required fullWidth />
                        </FormRow>
                        <FormRow>
                            <Editor
                                id="details"
                                name="details"
                                label="Details"
                                placeholder="Enter Details"
                                hideImageUpload
                            />
                        </FormRow>
                        <FormRow>
                            <Text id="tag" name="tag" label="MRI Opportunity" fullWidth />
                        </FormRow>
                        <FormButtons.Submit
                            text={isSubmitting ? 'Creating Lead' : 'Create'}
                            disable={!isValid || isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateLeadForm;

