import { RequestsAPI } from 'API/Requests';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { LastLocationType, useLastLocation } from 'react-router-last-location';
import Modal from 'Shared/Modal/Modal';
import * as Yup from 'yup';
import { Add, IconColors, Remove, Upload } from '../../../Icons';
import { Button } from '../../../Shared/Button';
import { ButtonRow } from '../../../Shared/ButtonRow';
import { EditorContentDisplay } from '../../../Shared/Content';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { FormButtons } from '../../../Shared/Forms';
import Editor from '../../../Shared/Forms/Editor';
import { IconWithTextWithCallback, LoadingContent, NoContent, SecondaryTitle } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { TabStates, TabStatesWithAction } from '../../../Shared/TabStates';
import UploadFiles from '../../../Shared/UploadFiles';
import { CurrentUserState, Requests } from '../../../State';
import { addErrorMessage, addSuccessMessage } from '../../../State/GlobalMessages/actionCreators';
import { RequestStatus, Route } from '../../../Types';
import { getRootPath, Mappers, verifyFileUpload } from '../../../utils';
import { WatchingRequest } from '../Watching/Watching';
import { ClosedRequestAdminView } from './AdminView/ClosedRequestAdminView/ClosedRequestAdminView';
import { AssignedToUser } from './AssignedToUser';
import { Attachments } from './Attachments/Attachments';
import { Category } from './Category';
import CreatedByUser from './CreatedByUser/CreatedByUser';
import { Notes } from './Notes';
import { PendingAttachments } from './PendingAttachments';
import { Priority } from './Priority/Priority';
import { RequestHistory } from './RequestHistory';
import { Status } from './Status';
import { TenantRequestSummary } from './TenantRequestSummary';

const styles = require('./request-details.module.css');
const attachmentStyles = require('./Attachments/attachments.module.css');

export const RequestDetails: React.FC<{}> = () => {
    const { selectors } = Requests;

    const dispatch = useDispatch();

    let { path } = useRouteMatch();
    let { requestId } = useParams<{ requestId: string }>();
    const lastLocation: LastLocationType = useLastLocation();

    const currentUserIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);
    const requestIsLoaded: boolean = useSelector(selectors.requestIsLoaded(requestId));
    const request: Requests.Types.Request = useSelector(selectors.request(requestId));
    const requestDescription: string = useSelector(selectors.requestDescription(requestId));

    const [showUpdateForm, toggleUpdateForm] = React.useState<boolean>(false);
    const [tabViewState, setTabViewState] = React.useState<number>(0);
    const [refreshNotes, toggleNoteRefresh] = React.useState<boolean>(false);
    const [uploadAttachmentModal, toggleUploadAttachmentModal] = React.useState<boolean>(false);
    const [attachmentsToUpload, setAttachmentsToUpload] = React.useState<File[]>([]);
    const [attachmentWarnings, setAttachmentWarnings] = React.useState<string[]>([]);

    React.useEffect(() => {
        RequestsAPI.getDetails(parseInt(requestId)).then((requestResponse) => {
            dispatch({
                type: Requests.Actions.ADD_REQUEST,
                payload: Mappers.mapRequestResponseToRequest(requestResponse),
            } as Requests.ActionTypes);
        });
    }, [requestId]);

    const getRequestListTarget = (): string =>
        lastLocation?.pathname.startsWith('/requests') && !lastLocation?.pathname.includes('/create')
            ? lastLocation.pathname
            : getRootPath(path, '/requests');

    const routes: Route[] = [{ target: getRequestListTarget(), display: 'Requests' }];

    const breadCrumbs = {
        current: 'Request Details',
        routes,
    };

    const triggerUpdateForm = () => {
        toggleUpdateForm(true);
    };

    /*
     * Note and Update are used interchangeably throughout as the display is 'Update', though the feature is 'Notes'
     * Update is retained to allow an easier transition for users within the UI/UX
     * Form inputs require the use of 'update', for a11y: name, label, etc., creating the below coupling of display and logic
     * */
    const addNote = async ({ update: note }) => {
        try {
            const { noteId } = await RequestsAPI.addNote(requestId, note, false);

            await uploadAttachments(noteId);

            await handleClearNote();

            toggleNoteRefresh(true);

            dispatch(addSuccessMessage('Your update was added.'));
        } catch (err) {
            dispatch(addErrorMessage('Your update could not be added. Please try again.'));
        }

        toggleUpdateForm(false);
    };

    const handleTabStates = (value: number) => {
        setTabViewState(value);
    };

    const handleClearNote = async () => {
        setAttachmentsToUpload([]);
        setAttachmentWarnings([]);
        toggleUpdateForm(false);
    };

    const handleAttachment = (files: File[]) => {
        setAttachmentWarnings([]);

        const { files: verifiedFiles, warnings } = verifyFileUpload([...attachmentsToUpload, ...files]);

        setAttachmentsToUpload(verifiedFiles);

        if (!!Object.keys(warnings).length) {
            setAttachmentWarnings(Object.values(warnings));
        }
    };

    const removeAttachmentFromList = (index: number) => {
        setAttachmentsToUpload([...attachmentsToUpload.slice(0, index), ...attachmentsToUpload.slice(index + 1)]);
    };

    const uploadAttachments = async (noteId: number) => {
        if (!!attachmentsToUpload && attachmentsToUpload.length > 0) {
            await RequestsAPI.addNoteAttachments(requestId, noteId, attachmentsToUpload);
        }
    };

    const tabs = [
        {
            name: 'Updates',
            callBack: handleTabStates,
            action: {
                actionTitle: 'Add Update',
                callBack: triggerUpdateForm,
                ActionIcon: Add,
            },
        },
        { name: 'History', callBack: handleTabStates },
    ];

    return (
        <PageWrapper pageTitle="Requests | Details" breadCrumbs={breadCrumbs}>
            {requestIsLoaded ? (
                <div className={styles.RequestDetails}>
                    <FlexWrapper align="start" justify="between">
                        <div>
                            <h1>{`Request #${request.id}`}</h1>
                            {currentUserIsTenant ? (
                                <h2
                                    className={styles.LocationSummary}
                                >{`${request.occupantName} @ ${request.propertyName}`}</h2>
                            ) : (
                                <Link to={`/locations/${request.propertyId}/occupants/${request.occupantId}`}>
                                    <h2
                                        className={styles.AdminLocationSummary}
                                    >{`${request.occupantName} @ ${request.propertyName}`}</h2>
                                </Link>
                            )}
                        </div>
                        {!currentUserIsTenant && <WatchingRequest requestId={request.id} />}
                    </FlexWrapper>
                    {!currentUserIsTenant && request.status === RequestStatus.Closed ? (
                        <ClosedRequestAdminView request={request} />
                    ) : (
                        <>
                            <PendingAttachments requestId={request.id} />
                            <div className={styles.RequestSummary}>
                                <div className={styles.RequestSummaryLeftPanel}>
                                    {!currentUserIsTenant && (
                                        <AssignedToUser requestId={request.id} user={request.assignedTo} />
                                    )}
                                    <div className={styles.TextRow}>
                                        <p>Created Date:</p>
                                        <p>{format(new Date(request.createdDate), 'LL/dd/yy p')}</p>
                                    </div>
                                    <CreatedByUser name={request.createdBy.name} email={request.createdBy.email} />
                                </div>
                                {currentUserIsTenant ? (
                                    <div className={styles.TenantSummaryRightPanel}>
                                        <TenantRequestSummary request={request} />
                                    </div>
                                ) : (
                                    <div className={styles.RequestSummaryRightPanel}>
                                        <div className={styles.Row}>
                                            <Priority requestId={request.id} />
                                        </div>
                                        <div className={styles.Row}>
                                            <Status requestId={request.id} />
                                        </div>
                                        <Category requestId={request.id} />
                                    </div>
                                )}
                            </div>
                            <SecondaryTitle title="Description" />
                            <div className={styles.RequestDescription}>
                                <EditorContentDisplay content={requestDescription} />
                            </div>
                            <Attachments request={request} requestIsLoaded={requestIsLoaded} />
                            {request.status === RequestStatus.Closed ? (
                                <TabStates tabs={tabs} currentTab={tabViewState} />
                            ) : (
                                <TabStatesWithAction tabs={tabs} currentTab={tabViewState} />
                            )}
                            {tabViewState === 0 ? (
                                <>
                                    {showUpdateForm && (
                                        <div className={styles.AddUpdateForm}>
                                            <Formik
                                                initialValues={{
                                                    update: '',
                                                }}
                                                onSubmit={addNote}
                                                validationSchema={Yup.object({
                                                    update: Yup.string()
                                                        .required('An update is required.')
                                                        .max(4000, 'Your update has exceeded the maximum size allowed.'),
                                                })}
                                            >
                                                {({ isSubmitting, isValid }) => (
                                                    <Form>
                                                        <Editor
                                                            label="Update"
                                                            id="request-update-editor"
                                                            name="update"
                                                            placeholder="Enter Update Details"
                                                            hideLabel={true}
                                                            hideImageUpload={true}
                                                        />
                                                        <FlexWrapper
                                                            align="center"
                                                            justify="between"
                                                            style={{
                                                                margin: '1rem 0 0.5rem',
                                                            }}
                                                        >
                                                            <h3
                                                                style={{
                                                                    fontSize: '0.875rem',
                                                                    margin: '0',
                                                                }}
                                                            >
                                                                Attachments
                                                            </h3>
                                                            <IconWithTextWithCallback
                                                                text="Add Attachments"
                                                                Icon={Add}
                                                                callBack={() => toggleUploadAttachmentModal(true)}
                                                            />
                                                        </FlexWrapper>
                                                        {attachmentsToUpload.length > 0 ? (
                                                            <div
                                                                className={attachmentStyles.AttachmentList}
                                                                style={{ width: '100%' }}
                                                            >
                                                                {attachmentsToUpload.map((file: File, index: number) => (
                                                                    <p
                                                                        key={`file-to-upload-${file.name}-${file.lastModified}`}
                                                                        className={attachmentStyles.FileRow}
                                                                        onClick={() => removeAttachmentFromList(index)}
                                                                    >
                                                                        {file.name}
                                                                        <Remove
                                                                            color={IconColors.DarkGrey}
                                                                            aspect="1.3rem"
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                                stroke: 'hsl(206, 100%, 40%)',
                                                                                margin: '0 0 0.375rem',
                                                                            }}
                                                                        />
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <NoContent
                                                                lowProfile
                                                                withMarginBottom
                                                                message="No Attachments Added"
                                                            />
                                                        )}
                                                        <ButtonRow withMarginTop>
                                                            <Button callback={handleClearNote} text="Cancel" inverse />
                                                            <FormButtons.Submit
                                                                text="Add Update"
                                                                disable={isSubmitting || !isValid}
                                                            />
                                                        </ButtonRow>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    )}
                                    <Notes
                                        requestId={parseInt(requestId)}
                                        forceRefresh={refreshNotes}
                                        clearRefresh={() => toggleNoteRefresh(false)}
                                    />
                                </>
                            ) : (
                                <RequestHistory requestId={parseInt(requestId)} />
                            )}
                        </>
                    )}
                </div>
            ) : (
                <LoadingContent />
            )}
            {uploadAttachmentModal && (
                <Modal
                    header="Add Attachments to Note"
                    callBack={() => {
                        toggleUploadAttachmentModal(false);
                    }}
                >
                    <div className={attachmentStyles.UploadAttachmentModal}>
                        <div className={attachmentStyles.UploadAttachmentModalDisplay}>
                            <div className={attachmentStyles.UploadIconWrapper}>
                                <UploadFiles addFilesCallback={handleAttachment}>
                                    <div className={attachmentStyles.UploadIcon}>
                                        <Upload />
                                        <p>Upload Files</p>
                                    </div>
                                </UploadFiles>
                            </div>
                            <div className={attachmentStyles.AttachmentList}>
                                {!!attachmentsToUpload.length ? (
                                    attachmentsToUpload.map((file: File) => (
                                        <p
                                            key={`file-to-upload-${file.name}-${file.lastModified}`}
                                            className={attachmentStyles.FileRow}
                                        >
                                            {file.name}
                                        </p>
                                    ))
                                ) : (
                                    <p className={attachmentStyles.FileRow}>No attachments</p>
                                )}
                            </div>
                        </div>
                        {!!attachmentWarnings.length &&
                            attachmentWarnings.map((warning: string) => (
                                <div className={attachmentStyles.AttachmentWarning} key={`attachment-warning-${warning}`}>
                                    <p>{warning}</p>
                                </div>
                            ))}
                        <Button
                            withMarginTop
                            fullWidth
                            callback={() => toggleUploadAttachmentModal(false)}
                            inverse={attachmentsToUpload.length < 1}
                            text={attachmentsToUpload.length ? `Add ${attachmentsToUpload.length} files` : 'Cancel'}
                        />
                    </div>
                </Modal>
            )}
        </PageWrapper>
    );
};

