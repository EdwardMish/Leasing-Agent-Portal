import * as React from 'react';

import { DocumentLink } from '../../Types';
import { Remove } from '../../Icons';
import { NoContent } from '../../Shared/PageElements';

import styles from './document-list.module.css';
import { AuthenticatedLink } from './AuthenticatedLink';

interface DocumentListProps {
    documents: DocumentLink[];
    allowRemoval?: boolean;
    noContentMessage?: string;
    removeItem?: (identifier: string | number) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
    documents,
    allowRemoval = false,
    noContentMessage = 'There are no documents to view.',
    removeItem = () => {},
}) => (
    <>
        {documents.length ? (
            <>
                {documents.map(({ link, title, identifier = title }: DocumentLink) => (
                    <div className={styles.Document} key={`document-list-${link}`}>
                        <AuthenticatedLink
                            url={`${link}${link.endsWith('/download') === false ? '/download' : ''}`}
                            filename={title}
                        >
                            {title}
                        </AuthenticatedLink>
                        {allowRemoval && (
                            <div
                                className={styles.RemoveItem}
                                onClick={() => {
                                    removeItem(identifier);
                                }}
                            >
                                <Remove />
                            </div>
                        )}
                    </div>
                ))}
            </>
        ) : (
            <NoContent message={noContentMessage} />
        )}
    </>
);


