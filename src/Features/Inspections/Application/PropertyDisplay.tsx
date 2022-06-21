import * as React from 'react';

interface PropertyDisplayProps {
    propertyName: string;
    createdDate: string;
}

const PropertyDisplay: React.FC<PropertyDisplayProps> = ({
    propertyName,
    createdDate,
}) => (
    <div>
        <p style={{ fontSize: '1rem' }}><b>{propertyName}</b></p>
        <p style={{ fontSize: '0.75rem', margin: '0.25rem 0 0' }}><i>{createdDate}</i></p>
    </div>
);

export default PropertyDisplay;
