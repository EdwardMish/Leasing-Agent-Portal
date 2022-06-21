import * as React from 'react';

import { FullEditUserDetails } from '../../../../Shared/Users';

interface OOUserDetailsProps {
    userId: number | string;
}

export const OOUserDetails: React.FC<OOUserDetailsProps> = ({ userId }) => <FullEditUserDetails userId={userId} />;
