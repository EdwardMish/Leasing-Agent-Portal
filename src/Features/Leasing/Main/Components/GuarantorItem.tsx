import React from 'react';
import { Link } from 'react-router-dom';
import itemStyles from '../../../Communications/News/List/news-list.module.css';
import WithActionsWrapper from 'Shared/WithActionsWrapper';
interface Properties {
    leadId: number;
    applicationId: number;
    name: string;
    email: string;
    cancelled: boolean;
    actions?: any[];
}

function GuarantorItem({ leadId, applicationId, name, email, cancelled, actions }: Properties): React.ReactElement {
    return (
        <>
            {cancelled ? (
                <div className={`cancelled`} style={{ boxSizing: 'border-box', marginTop: '1rem' }}>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
            ) : (
                <div className={itemStyles.NewsListItem} style={{ boxSizing: 'border-box', marginTop: '1rem' }}>
                    <WithActionsWrapper actions={actions}>
                        <Link to={`/leasing/leads/${leadId}/guarantors/${applicationId}`}>
                            <p style={{ color: '#0071ce' }}>{name}</p>
                            <p>{email}</p>
                        </Link>
                    </WithActionsWrapper>
                </div>
            )}
        </>
    );
}

export default GuarantorItem;

