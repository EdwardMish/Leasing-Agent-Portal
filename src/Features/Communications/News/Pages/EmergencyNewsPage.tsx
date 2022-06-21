import * as React from 'react';
import { Link } from 'react-router-dom';

import { ChevronLeft } from '../../../../Icons';

import { IconWithText } from '../../../../Shared/PageElements';

import { EmergencyNewsList } from '../List';

const EmergencyNewsPage: React.FC<{}> = () => (
    <>
        <Link
            to="/communications/news"
            style={{
                margin: '0 0 0.75rem',
                display: 'block',
            }}
        >
            <IconWithText Icon={ChevronLeft} iconOnLeft text="Back To List" />
        </Link>
        <EmergencyNewsList />
    </>
);

export default EmergencyNewsPage;
