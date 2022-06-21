import * as React from 'react'

import { LoadingContent } from '../../../../Shared/PageElements'

const styles = require('./request-list-skeletons.module.css')

interface ListSkeletonProps {
    message: string;
    noHeader?: boolean;
    noFooter?: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
    message,
    noHeader = false,
    noFooter = false
}) => (
        <div className={styles.ListSkeleton}>
            { !noHeader && <div className={styles.ListHeader}></div>}
            <div className={styles.ListRow}></div>
            <div className={styles.ListRow}></div>
            <div className={styles.ListRow}></div>
            <div className={styles.ListRow}></div>
            <div className={styles.ListRow}></div>
            <div className={styles.ListRow}></div>
            <div className={styles.ListRow}></div>
            <div className={styles.ListRow}></div>
            { !noFooter && <div className={styles.ListFooter}></div>}
            <div className={styles.ListLoadingContent}><LoadingContent height={6.5} message={message} /></div>
        </div>
    )