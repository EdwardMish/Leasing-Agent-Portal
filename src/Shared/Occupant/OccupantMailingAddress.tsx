import * as React from 'react';

import { OccupantAddress } from '../../State/Shared/Types';
import { formatCityAndState } from '../../utils';

interface OccupantMailingAddressProps {
    mailingAddress: OccupantAddress;
}

const pStyles: React.CSSProperties = {
    margin: 0,
    lineHeight: '1.75',
    fontSize: '0.875rem',
}

const OccupantMailingAddress: React.FC<OccupantMailingAddressProps> = ({ mailingAddress }) => (
    <>
        {mailingAddress.street1 && <p style={pStyles}>{mailingAddress.street1}</p>}
        {mailingAddress.street2 && <p style={pStyles}>{mailingAddress.street2}</p>}
        <p style={pStyles}>{formatCityAndState(mailingAddress)}</p>
        {mailingAddress.zipcode && <p style={pStyles}>{mailingAddress.zipcode}</p>}
    </>
)

export default OccupantMailingAddress;
