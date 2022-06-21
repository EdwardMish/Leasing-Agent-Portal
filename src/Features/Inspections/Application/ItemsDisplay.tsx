import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useActiveInspectionFromState from '../../../State/Inspections/App/Hooks/useActiveInspectionFromState';
import { InspectionItem } from '../../../State/Inspections/Types/InspectionItem';
import isNote from '../../../State/Inspections/Types/TypeGuards/isNote';
import isPhoto from '../../../State/Inspections/Types/TypeGuards/isPhoto';

import NoteDisplay from './Notes/NoteDisplay';
import PhotoDisplay from './Photos/PhotoDisplay';

const ItemsDisplay: React.FC = () => {
    const history = useHistory();

    const { propertyId: propertyIdParam } = useParams<{ propertyId: string }>();
    const propertyId = parseInt(propertyIdParam, 10);

    const { activeInspection, inspectionItems } = useActiveInspectionFromState(propertyId);

    const renderItem = (item: InspectionItem) => {
        if (isNote(item)) {
            return (
                <NoteDisplay
                    display={item?.note || ''}
                    id={item.id}
                    categoryId={item.categoryId || 1}
                    followUp={item.followUp}
                    editable={true}
                    onEdit={() => history.push(`/app/inspections/${propertyId}/notes/${item.id}`)}
                />
            )
        }

        if (isPhoto(item)) {
            return (
                <PhotoDisplay
                    inspectionId={activeInspection.id}
                    photo={item}
                    propertyId={propertyId}
                />
            )
        }

        return null;
    };

    return (
        <>
            {
                inspectionItems.map((item) => (
                    <div
                        key={`inspection-item-list-${item.id} `}
                        style={{ margin: '0 0 0.5rem' }}
                    >
                        {renderItem(item)}
                    </div>
                ))
            }
        </>
    );
};

export default ItemsDisplay;
