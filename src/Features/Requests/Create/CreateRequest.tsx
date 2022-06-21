import { RequestsAPI, RequestsTypes } from 'API/Requests';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import { Close, IconColors, Upload } from 'Icons';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormRow, TwoColumnFormRow } from 'Shared/Forms';
import Editor from 'Shared/Forms/Editor';
import Modal from 'Shared/Modal/Modal';
import { LoadingContent, ToggleIcon } from 'Shared/PageElements';
import { PageWrapper } from 'Shared/PageWrapper';
import {
    PropertyTenantSelectionHeader,
    DropDownSelector,
    TenantSelection,
    useSingleOccupantSelection,
    useSinglePropertySelection,
} from 'Shared/PropertyTenantResolution';
import { Search } from 'Shared/Search';
import UploadFiles from 'Shared/UploadFiles';
import { globalMessageActionCreators, Requests } from 'State';
import { PropertyOccupant } from 'State/Shared/Types';
import { Route } from 'Types';
import { getRootPath, verifyFileUpload, WithFormikFieldWrapper } from 'utils';
import { OccupantSummary } from 'Features/Sales/OccupantSummary';
import { CategorySelect } from './CategorySelect';
import { Hidden } from 'Shared/Forms/Input';

import styles = require('./create-request-form.module.css');

export const CreateRequest: React.FC<{}> = () => {
    const dispatch = useDispatch();

    let history = useHistory();
    let { path } = useRouteMatch();

    const [showTenants, toggleShowTenants] = React.useState<boolean>(false);
    const [showActiveOccupants, toggleActiveOccupants] = React.useState<boolean>(false);
    const [occupantList, setOccupantList] = React.useState<PropertyOccupant[]>([]);
    const [attachments, setAttachments] = React.useState<File[]>([]);
    const [attachmentWarnings, setAttachmentWarnings] = React.useState<string[]>([]);

    const [
        availableProperties,
        selectedPropertyId,
        visibleProperties,
        selectProperty,
        searchProperties,
        propertiesAreLoaded,
        hasSingleProperty,
    ] = useSinglePropertySelection();

    const [
        availableOccupants,
        selectedOccupantId,
        setActiveProperty,
        selectOccupant,
        searchOccupants,
        occupantsAreLoaded,
        hasSingleOccupant,
        currentOccupant,
    ] = useSingleOccupantSelection();

    React.useEffect(() => {
        if (hasSingleProperty && selectedPropertyId > -1) setActiveProperty(selectedPropertyId);
    }, [hasSingleProperty, selectedPropertyId]);

    React.useEffect(() => {
        showActiveOccupants
            ? setOccupantList(availableOccupants.filter((occupant) => occupant.id === selectedOccupantId))
            : setOccupantList(availableOccupants);
    }, [showActiveOccupants, JSON.stringify(availableOccupants)]);

    const handlePropertySelection = (propertyId: number) => {
        setActiveProperty(propertyId);

        selectProperty(propertyId);
    };

    const handleOccupantSelection = (occupantId: number) => {
        selectOccupant(occupantId);

        toggleShowTenants(false);
    };

    const handlePropertySearch = (searchInput: string): void => {
        searchProperties(searchInput);
    };

    const handleOccupantSearch = (searchInput: string): void => {
        searchOccupants(searchInput);
    };

    const handleOccupantToggle = () => {
        toggleShowTenants(!showTenants);
        searchOccupants('');
    };

    const handleFiles = (files: File[]) => {
        setAttachmentWarnings([]);

        const { files: verifiedFiles, warnings } = verifyFileUpload([...attachments, ...files]);

        setAttachments(verifiedFiles);

        if (!!Object.keys(warnings).length) {
            setAttachmentWarnings(Object.values(warnings));
        }
    };

    const handleFileRemoval = (file: File) => {
        const fileIndex: number = attachments.findIndex(
            (a: File) => a.name === file.name && a.lastModified === file.lastModified,
        );

        if (fileIndex > -1) {
            setAttachments([...attachments.slice(0, fileIndex), ...attachments.slice(fileIndex + 1)]);
        }
    };

    const createRequest = (values: { description: string; categoryId: string; subcategoryId: string }) => {
        const { description, categoryId, subcategoryId } = values;

        const request: RequestsTypes.NewRequest = {
            description: description,
            category: categoryId,
            subcategory: subcategoryId,
            propertyId: selectedPropertyId,
            occupantId: selectedOccupantId,
        };

        RequestsAPI.newRequest(request)
            .then(({ requestId }) => {
                const requestDetailsRoute = `/requests/details/${requestId}`;

                if (!!attachments && attachments.length > 0) {
                    RequestsAPI.addAttachments(requestId, attachments)
                        .then(() => {
                            history.push(requestDetailsRoute);
                        })
                        .catch(() => {
                            dispatch({
                                type: Requests.Actions.ADD_PENDING_ATTACHMENTS,
                                payload: {
                                    id: requestId,
                                    files: attachments,
                                },
                            } as Requests.ActionTypes);
                        });
                } else {
                    history.push(requestDetailsRoute);
                }
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        'We were not able to create your request. Please try again.',
                    ),
                );
            });
    };

    const target = getRootPath(path, '/requests');

    const routes: Route[] = [{ target, display: 'Requests' }];

    const queryParams: URLSearchParams = new URLSearchParams(useLocation().search);

    const breadCrumbs = {
        current: 'Create Request',
        routes,
    };

    const onSubmitHandler = (values) => {
        createRequest(values);
    };

    return (
        <PageWrapper pageTitle="Requests | Create" breadCrumbs={breadCrumbs}>
            <div className={styles.NewRequestForm}>
                <h1>Create Request</h1>

                <Formik
                    initialValues={{
                        property: '',
                        occupant: '',
                        description: '',
                        categoryId: queryParams.get('category') || '',
                        subcategoryId: '',
                    }}
                    onSubmit={onSubmitHandler}
                    validationSchema={Yup.object({
                        property: Yup.string().required('Please select a Property').not(['-1'], 'Property is required'),
                        occupant: Yup.string().when('property', {
                            is: (prop) => prop !== -1,
                            then: Yup.string().required('Please select a Neighbor').not(['-1'], 'A Neighbor is required'),
                        }),
                        categoryId: Yup.string().required('Please select a category.'),
                        description: Yup.string().required('Please enter a description.'),
                    })}
                >
                    {({ values, isSubmitting }) => (
                        <Form>
                            <FormRow>
                                {hasSingleProperty && hasSingleOccupant ? (
                                    <>
                                        <OccupantSummary
                                            occupantName={availableOccupants[0].name}
                                            propertyName={availableProperties[0].name}
                                        />
                                        <Hidden
                                            id="property"
                                            name="property"
                                            label="property"
                                            value={availableProperties[0].id}
                                        />
                                        <Hidden
                                            id="occupant"
                                            name="occupant"
                                            label="occupant"
                                            value={availableOccupants[0].id}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className={styles.MockLabel}>Select a Property and Neighbor (required)</p>
                                        <div style={{ margin: '0 0 1.5rem' }}>
                                            <WithFormikFieldWrapper name="property" value={selectedPropertyId}>
                                                <DropDownSelector
                                                    availableOptions={availableProperties}
                                                    selectedOptionId={selectedPropertyId}
                                                    visibleOptions={visibleProperties}
                                                    searchHandler={handlePropertySearch}
                                                    selectOptionHandler={handlePropertySelection}
                                                    loaded={propertiesAreLoaded}
                                                />
                                            </WithFormikFieldWrapper>
                                            {selectedPropertyId > -1 && (
                                                <>
                                                    {occupantsAreLoaded ? (
                                                        <WithFormikFieldWrapper name="occupant" value={selectedOccupantId}>
                                                            <PropertyTenantSelectionHeader
                                                                propertyOrOccupant={currentOccupant}
                                                                handler={handleOccupantToggle}
                                                                listActive={showTenants}
                                                                type="t"
                                                                withMargin
                                                            />
                                                        </WithFormikFieldWrapper>
                                                    ) : (
                                                        <LoadingContent message="Loading Neighbors" />
                                                    )}
                                                </>
                                            )}
                                            {selectedPropertyId > -1 && showTenants && (
                                                <>
                                                    <Search handler={handleOccupantSearch} />
                                                    <ToggleIcon
                                                        active={showActiveOccupants}
                                                        message="Show Selected Only"
                                                        toggle={() => toggleActiveOccupants(!showActiveOccupants)}
                                                    />
                                                    <ul className={`${styles.list} ${styles.PropertySelect}`}>
                                                        {occupantList.map((occupancy: PropertyOccupant) => (
                                                            <TenantSelection
                                                                key={`${occupancy.id}-available`}
                                                                toggleOccupantSelection={handleOccupantSelection}
                                                                activeOccupantIds={[selectedOccupantId]}
                                                                name={occupancy.name}
                                                                id={occupancy.id}
                                                            />
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}
                            </FormRow>
                            <FormRow>
                                <Editor
                                    label="Description"
                                    id="request-description-editor"
                                    name="description"
                                    placeholder="Enter Request Details"
                                    required={true}
                                />
                            </FormRow>
                            <TwoColumnFormRow>
                                <div className={styles.Attachments}>
                                    <div className={styles.AttachmentsColumn}>
                                        <div className={styles.AddAttachmentsInput}>
                                            <UploadFiles addFilesCallback={handleFiles}>
                                                <div className={styles.AddAttachment}>
                                                    <Upload />
                                                    <p>Upload Files</p>
                                                </div>
                                            </UploadFiles>
                                        </div>
                                        <div className={styles.CurrentFiles}>
                                            <p className={styles.MockLabel}>Attachments</p>
                                            {!!attachments.length ? (
                                                attachments.map((file: File) => (
                                                    <div
                                                        className={styles.CurrentFileRow}
                                                        key={`attachment-${file.name}-${file.lastModified}`}
                                                    >
                                                        <p>{file.name}</p>
                                                        <div
                                                            className={styles.CurrentFileRowIcon}
                                                            onClick={() => handleFileRemoval(file)}
                                                        >
                                                            <Close aspect="1rem" />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className={styles.CurrentFileRow}>
                                                    <p>No attachments</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {!!attachmentWarnings.length &&
                                        attachmentWarnings.map((warning: string) => (
                                            <div className={styles.AttachmentWarning} key={`attachment-warning-${warning}`}>
                                                <p>{warning}</p>
                                            </div>
                                        ))}
                                </div>
                                <CategorySelect required={true} currentCategoryId={values.categoryId} />
                            </TwoColumnFormRow>
                            <FlexWrapper justify="end" align="center">
                                <Link style={{ marginRight: '1rem', color: IconColors.BrandBlue }} to="/requests">
                                    Cancel
                                </Link>
                                <FormButtons.Submit
                                    text="Create Request"
                                    disable={isSubmitting && selectedPropertyId > -1}
                                />
                            </FlexWrapper>
                            {selectedPropertyId > -1 && isSubmitting && (
                                <Modal hideHeader callBack={() => {}}>
                                    <LoadingContent
                                        withMarginBottom={false}
                                        withMarginTop={false}
                                        message="Creating Request..."
                                    />
                                </Modal>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </PageWrapper>
    );
};

