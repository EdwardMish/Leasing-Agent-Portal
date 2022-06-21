import * as React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

interface InspectionLinkProps {
    inspectionId: string | number;
    inspectionDate: string;
}

const InspectionLink: React.FC<InspectionLinkProps> = ({
    inspectionId,
    inspectionDate,
}) => {
    const { url } = useRouteMatch();

    return (
        <div>
            <Link to={`${url}/details/${inspectionId}`}>
                <p>
                    {
                        `Inspection Completed: ${new Date(inspectionDate).toLocaleString()}`
                    }
                </p>
            </Link>
        </div>
    );
};

export default InspectionLink;
