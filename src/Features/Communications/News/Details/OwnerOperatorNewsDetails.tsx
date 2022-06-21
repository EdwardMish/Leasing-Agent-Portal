import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { Close, Pencil } from 'Icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'Shared/Button';
import ConfirmationModal from 'Shared/ConfirmationModal/ConfirmationModal';
import { EditorContentDisplay } from 'Shared/Content/EditorContentDisplay';
import { Route } from 'Types/Route';
import { mapNewsAttachmentToDocumentLink } from 'utils/Mappers';
import * as Yup from 'yup';
import { News } from 'API';
import { DocumentList } from 'Shared/Documents';
import { FlexWrapper } from 'Shared/FlexWrapper';
import { FormButtons, FormRow } from 'Shared/Forms';
import Editor from 'Shared/Forms/Editor';
import { IconWithTextWithCallback, LoadingContent, NoContent, ValueText } from 'Shared/PageElements';
import { PageWrapper } from 'Shared/PageWrapper';
import { CurrentUserState } from 'State';
import { addErrorMessage, addSuccessMessage } from 'State/GlobalMessages/actionCreators';
import { differenceInDays } from 'date-fns';

const styles = require('./news-details.module.css');

const routes: Route[] = [{ target: '/communications/news', display: 'Communications' }];

const breadCrumbs = {
    current: 'News Details',
    routes,
};

const OwnerOperatorNewsDetails: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const { newsItemId } = useParams<{ newsItemId: string }>();

    const [news, setNews] = React.useState<News.Types.News>();
    const [notFound, showNotFound] = React.useState<boolean>(false);
    const [showEditDescription, toggleShowEditDescription] = React.useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = React.useState<boolean>(false);
    const [isExpired, setIsExpired] = React.useState(false);
    const userIsOwnerOperator: boolean = useSelector(CurrentUserState.selectors.currentUserIsOwnerOperator);

    React.useEffect(() => {
        if (!news) {
            News.API.getNewsItemDetails(parseInt(newsItemId))
                .then((news) => {
                    setNews(news);
                    News.API.markAsRead(news.id);
                    const dateDiff = differenceInDays(news?.publishTo, new Date());
                    setIsExpired(dateDiff < 0);
                })
                .catch((error: AxiosError) => {
                    if (error.response?.status == 404) {
                        showNotFound(true);
                    }
                });
        }
    }, [newsItemId]);

    const confirmDelete = () => {
        if (news?.canDelete) {
            setShowConfirmationModal(true);
        }
    };

    const deleteNews = (id: number) => {
        News.API.deleteNewsItem(id)
            .then(() => {
                dispatch(addSuccessMessage(`News post ${news?.subject} has been deleted.`));
                history.push('/communications');
            })
            .catch((err) => {
                dispatch(addErrorMessage(err.Message));
            });
    };

    const removeAttachment = (identifier: string | number) => {
        if (news) {
            News.API.deleteAttachment(newsItemId, identifier)
                .then(() => {
                    dispatch(addSuccessMessage(`Attachment ${identifier} has been deleted.`));

                    setNews({ ...news, attachments: news.attachments.filter((_) => _.name !== identifier) });
                })
                .catch((err) => {
                    dispatch(addErrorMessage(err.Message));
                });
        }
    };

    const updateDescription = (description: string) => {
        if (news) {
            News.API.updateDescription(news.id, description)
                .then(() => {
                    setNews({ ...news, body: description } as News.Types.News);
                    toggleShowEditDescription(false);
                })
                .catch((err) => {
                    dispatch(addErrorMessage(err.Message));
                });
        }
    };

    return (
        <PageWrapper breadCrumbs={breadCrumbs} pageTitle="News Details">
            {news ? (
                <div className={styles.Details}>
                    <div className={styles.SubjectAndActions}>
                        <h1 className={styles.Subject}>{news.subject}</h1>
                        <div className={styles.Actions}>
                            {news?.canDelete && <Button text="Delete" callback={confirmDelete} />}
                        </div>
                    </div>
                    <ValueText valueText={news.createdByFullName} />
                    <div className={styles.PublishDate}>
                        Published between {new Date(news.publishFrom).toDateString()} and{' '}
                        {new Date(news.publishTo).toDateString()}
                    </div>
                    <div>
                        {showEditDescription ? (
                            <div>
                                {showEditDescription && !isExpired && (
                                    <FlexWrapper align="end" justify="end">
                                        <IconWithTextWithCallback
                                            Icon={Close}
                                            text=""
                                            callBack={() => toggleShowEditDescription(false)}
                                        />
                                    </FlexWrapper>
                                )}
                                <Formik
                                    initialValues={{
                                        description: news.body,
                                    }}
                                    onSubmit={(values) => {
                                        updateDescription(values.description);
                                    }}
                                    validationSchema={Yup.object({
                                        description: Yup.string().required('A description is required.'),
                                    })}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <FormRow>
                                                <Editor
                                                    id="description"
                                                    name="description"
                                                    required
                                                    label="Enter Description"
                                                    placeholder="Enter Description..."
                                                />
                                            </FormRow>
                                            <FlexWrapper align="start" justify="between" className={styles.TwoColumn}>
                                                <div>
                                                    <Button
                                                        text="Cancel"
                                                        callback={() => toggleShowEditDescription(!showEditDescription)}
                                                        fullWidth
                                                        inverse
                                                    />
                                                </div>
                                                <div>
                                                    <FormButtons.Submit text="Update" fullWidth disable={isSubmitting} />
                                                </div>
                                            </FlexWrapper>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        ) : (
                            <>
                                {!isExpired && (
                                    <FlexWrapper align="end" justify="end">
                                        <IconWithTextWithCallback
                                            Icon={Pencil}
                                            text=""
                                            callBack={() => toggleShowEditDescription(true)}
                                        />
                                    </FlexWrapper>
                                )}
                                <div>
                                    <EditorContentDisplay content={news.body} />
                                </div>
                            </>
                        )}
                    </div>
                    <h3>Attachments</h3>
                    <DocumentList
                        documents={news.attachments.map((attachment: News.Types.Attachment) =>
                            mapNewsAttachmentToDocumentLink(news.id, attachment),
                        )}
                        noContentMessage="No attachments available."
                        allowRemoval={userIsOwnerOperator}
                        removeItem={removeAttachment}
                    />
                    <div className={styles.Neighbors}>
                        <h3>Neighbors</h3>
                        <ul>
                            {news.occupants.map((occupant) => (
                                <li key={`occupant-${occupant}`}>{occupant}</li>
                            ))}
                        </ul>
                    </div>
                    {showConfirmationModal && (
                        <ConfirmationModal
                            header="Delete News"
                            onCancel={() => setShowConfirmationModal(false)}
                            onConfirm={() => deleteNews(news.id)}
                        >
                            <p>Are you sure you would like to delete this news post?</p>
                        </ConfirmationModal>
                    )}
                </div>
            ) : (
                <>
                    {notFound ? (
                        <NoContent message="The News post you are trying to view cannot be found." />
                    ) : (
                        <LoadingContent />
                    )}
                </>
            )}
        </PageWrapper>
    );
};

export default OwnerOperatorNewsDetails;
