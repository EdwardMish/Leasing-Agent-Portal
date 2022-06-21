import { Document } from 'API/Leasing/Types';
import ReviewPanel from 'Features/Leasing/Application/Components/ReviewPanel';
import useDocumentsState from 'Features/Leasing/Application/Hooks/usePersonalApplicationDocumentsState';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationPageWrapper from 'Shared/Application/ApplicationPageWrapper';
import { Button } from 'Shared/Button';
import { FlexWrapper } from 'Shared/FlexWrapper';
import IconLink from 'Shared/Forms/IconLink';
import { Divider, LoadingContent, NoContent, Title } from 'Shared/PageElements';
import GeneralSidebar, { SidebarLink, SingleLabelValue } from '../GeneralSidebar';
import styles from './assets-liabilities.module.css';

const DocumentsPage = ({ previous, addDocumentRoute }): React.ReactElement => {
    const history = useHistory();

    const goBackHandler = () => (previous ? history.push(previous) : history.goBack());
    const {
        loadingDocuments,
        selectRequestedDocuments,
        selectAdditionalDocuments,
        errorMessage,
        totalDocuments,
        getDocuments,
        deleteDocument,
        deletingDocument,
    } = useDocumentsState();

    const requestedDocuments = selectRequestedDocuments();
    const additionalDocuments = selectAdditionalDocuments();

    useEffect(() => {
        getDocuments();
    }, []);

    const onDeleteHandler = async (document: Document) => {
        await deleteDocument(document);
        await getDocuments();
    };

    const getAdditionalSidebar = (document: Document) => {
        const details: SidebarLink[] = [{ label: 'Upload(s)', value: '', links: document?.documents }];

        return (
            <ReviewPanel
                key={document?.id}
                title={document?.name}
                options={{
                    delete: {
                        modal: {
                            title: `Delete Document: ${document?.name}`,
                            content: 'Are you sure you want to delete this Document?',
                            onDeleteHandler: () => onDeleteHandler(document),
                            successMessage: 'The Document was successfully deleted',
                            errorMessage:
                                'Sorry, we were not able to delete the Document, please try again or contact us for support',
                        },
                    },
                }}
            >
                <GeneralSidebar sidebarDetails={details} fullWidth />
            </ReviewPanel>
        );
    };

    const getRequestedSidebar = (document: Document) => {
        const details: SidebarLink[] = [{ label: 'Upload(s)', value: '', links: document?.documents }];

        const requestToAdd = !document?.dateUploaded
            ? {
                  add: {
                      link: addDocumentRoute,
                      state: { document },
                  },
              }
            : {};

        return (
            <ReviewPanel key={document?.id} options={requestToAdd} title={document?.name}>
                <GeneralSidebar sidebarDetails={details} fullWidth />
            </ReviewPanel>
        );
    };

    const loading = loadingDocuments || deletingDocument;

    return (
        <ApplicationPageWrapper>
            <main className={styles.PageStyles}>
                <FlexWrapper align="start" justify="between" fullWidth>
                    <Title title="Documents Overview" />
                    <SingleLabelValue label="Total Documents" value={totalDocuments} style={{ width: 'auto' }} />
                </FlexWrapper>
                <Divider />
                {loading && <LoadingContent />}
                {errorMessage && <NoContent message={errorMessage} />}
                <div className={styles.DocumentsSecondHeader}>
                    <Title level="h2" title="Requested Documents" />
                </div>

                {requestedDocuments.map((doc) => getRequestedSidebar(doc))}
                <div className={styles.DocumentsSecondHeader}>
                    <Title level="h2" title="Additional Documents" />
                </div>
                {additionalDocuments.map((doc) => getAdditionalSidebar(doc))}

                <IconLink text="ADD DOCUMENT" route={addDocumentRoute} iconAspect="2rem" style={{ marginTop: '1rem' }} />
                <div className={styles.ButtonWrapper}>
                    <Button text="Back" callback={goBackHandler} inverse />
                </div>
            </main>
        </ApplicationPageWrapper>
    );
};

export default DocumentsPage;
