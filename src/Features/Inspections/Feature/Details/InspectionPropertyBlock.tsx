import * as React from 'react';
import { format } from 'date-fns';

import { Inspection } from '../../../../State/Inspections/Types';

const secondaryStyle: React.CSSProperties = {
    margin: 0,
    fontStyle: 'italic',
    color: 'rgb(70, 81, 100)',
};

interface Properties {
    inspection: Inspection;
}

function InspectionPropertyBlock({ inspection }: Properties): React.ReactElement {
    return (
        <>
            <h1 style={{ margin: '0 0 0.75rem' }}>{inspection.propertyName}</h1>
            <div style={{ margin: '0 0 0.75rem' }}>
                <p style={secondaryStyle}>{`Created: ${format(new Date(inspection.createdDate), 'LL/dd/yy')}`}</p>
                {!!inspection.completedDate && (
                    <p
                        style={{
                            ...secondaryStyle,
                            margin: '0.5rem 0 0',
                        }}
                    >{`Completed: ${format(new Date(inspection.completedDate), 'LL/dd/yy')}`}</p>
                )}
            </div>
        </>
    );
}

export default InspectionPropertyBlock;
