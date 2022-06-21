import * as React from 'react';

import { NoContent } from './NoContent';
import { LoadingContent } from './LoadingContent';

interface DynamicContentProps {
    loaded: boolean;
    noContent: boolean;
    noContentMessage: string;
    loadingMessage?: string;
}

const DynamicContent: React.FC<DynamicContentProps> = ({
    loaded,
    noContent,
    noContentMessage,
    loadingMessage,
    children,
}): React.ReactElement => (
    <>
        {
            loaded
                ? noContent
                    ? <NoContent message={noContentMessage} />
                    : <>{children}</>
                : <LoadingContent message={loadingMessage} />
        }
    </>
);

export default DynamicContent;
