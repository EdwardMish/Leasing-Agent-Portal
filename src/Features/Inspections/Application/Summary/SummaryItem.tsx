import React from 'react';
import { InspectionCategories, InspectionCategoriesDisplayName } from '../../../../State/Inspections/Types';

interface SummaryItemProps {
    id: number;
    categoryId: InspectionCategories;
    note?: string;
}

export default ({ id, categoryId, note = '' }: SummaryItemProps): React.ReactElement => (
    <li key={`item-${id}`}>
        <p style={{ fontSize: '.875rem' }}>{note}</p>
        <p style={{
            margin: '0.5rem 0 0',
            fontSize: '.75rem',
            fontStyle: 'italic',
        }}
        >
            {InspectionCategoriesDisplayName[categoryId]}
        </p>
    </li>
);
