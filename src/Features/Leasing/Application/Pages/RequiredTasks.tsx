import React, { useEffect } from 'react';
import IconLink from 'Shared/Forms/IconLink';
import { Upload as UploadIcon } from 'Icons/Upload';
import { Question as QuestionIcon } from 'Icons/Question';
import { Document, Question } from 'API/Leasing/Types';

interface RequiredTasksProps {
    routes: Record<string, string>;
    application: any;
    documents: Document[];
    questions: Question[];
    setSelectedTab: (arg0: string) => void;
}

const RequiredTasks = ({
    routes,
    application,
    documents = [],
    questions = [],
    setSelectedTab,
}: RequiredTasksProps): React.ReactElement => {
    useEffect(() => {
        setSelectedTab('required');
    }, []);

    return (
        <div>
            {!application?.completedAssets && (
                <IconLink
                    text="ADD ASSETS"
                    route={routes.ADD_ASSET}
                    style={{ marginBottom: '1rem' }}
                    state={{ goBackLink: routes.OVERVIEW }}
                    iconAspect="2rem"
                />
            )}
            {!application?.completedLiabilities && (
                <IconLink
                    text="ADD LIABILITIES"
                    route={routes.ADD_LIABILITY}
                    style={{ marginBottom: '1rem' }}
                    state={{ goBackLink: routes.OVERVIEW }}
                    iconAspect="2rem"
                />
            )}
            {documents.map((doc) => (
                <IconLink
                    key={doc.id}
                    text={doc.name}
                    Icon={UploadIcon}
                    route={routes.ADD_DOCUMENT}
                    style={{ marginBottom: '1rem' }}
                    state={{ document: doc, goBackLink: routes.OVERVIEW }}
                    iconAspect="2rem"
                />
            ))}

            {questions.map((question) => (
                <IconLink
                    key={question.id}
                    text={question.question}
                    Icon={QuestionIcon}
                    route={routes.RESPOND_QUESTION}
                    style={{ marginBottom: '1rem' }}
                    state={{ question, goBackLink: routes.OVERVIEW }}
                    iconAspect="2rem"
                    wrapText
                />
            ))}
        </div>
    );
};

export default RequiredTasks;
