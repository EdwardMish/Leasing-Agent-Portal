import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Add } from '../../../../../Icons';

import { CurrentUserState } from '../../../../../State';

import { months } from '../../../../../utils';

const listStyles = require('../list-of-records.module.css');

interface RecordMissingProps {
    month: number | string;
    occupantId: number | string;
    year: number;
}

export const RecordMissing: React.FC<RecordMissingProps> = ({ month, occupantId, year }) => {
    const currentUserIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const monthInt: number = (typeof month === 'string' ? parseInt(month) : month) - 1;

    return (
        <div className={listStyles.Record}>
            <p>{months[month]}</p>
            <p />
            {
                currentUserIsTenant || new Date(year, monthInt, 1) > new Date(Date.now())
                    ? <p>--</p>
                    : (
                        <Link className={listStyles.MissingRecord} to={`/tenant/submit/${occupantId}/${year}/${month}`}>
                            <p>Missing</p>
                            <Add />
                        </Link>
                    )
            }
        </div>
    );
};
