import * as React from 'react';
import { useSelector } from 'react-redux';

import { InspectionItem } from '../../../../State/Inspections/Types/InspectionItem';
import { InspectionCategories, InspectionCategoriesDisplayName } from '../../../../State/Inspections/Types/InspectionCategories';

import { selectors } from '../../../../State/Inspections/Feature';

import isInteraction from '../../../../State/Inspections/Types/TypeGuards/isInteraction';
import isNote from '../../../../State/Inspections/Types/TypeGuards/isNote';
import isPhoto from '../../../../State/Inspections/Types/TypeGuards/isPhoto';

import InteractionRow from '../../../../Shared/Inspections/DetailRows/InteractionRow';
import NoteRow from '../../../../Shared/Inspections/DetailRows/NoteRow';
import PhotoRow from '../../../../Shared/Inspections/DetailRows/PhotoRow';

import { NoContent } from '../../../../Shared/PageElements';

interface CategoryBlockProps {
    categoryId: InspectionCategories;
    inspectionId: number | string;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ categoryId, inspectionId }): React.ReactElement => {
    const listItems: InspectionItem[] = useSelector(selectors.itemsByCategory(inspectionId, categoryId));

    const renderItem = (item: InspectionItem) => {
        if (isInteraction(item)) return <InteractionRow interaction={item} inspectionId={inspectionId} />

        if (isPhoto(item)) return <PhotoRow photo={item} inspectionId={inspectionId} />;

        if (isNote(item)) return <NoteRow note={item} />;

        return null;
    };

    return (
        <div style={{ margin: '0 0 1rem' }}>
            <h2 style={{
                fontSize: '1rem',
            }}>{InspectionCategoriesDisplayName[categoryId]}</h2>
            {
                listItems.length > 0
                    ? (
                        <div style={{ padding: '0 1rem 1rem' }}>
                            {
                                listItems.map((listItem: InspectionItem) => (
                                    <React.Fragment key={`category-list-item-${categoryId}-${listItem.id}`}>
                                        {renderItem(listItem)}
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    )
                    : <NoContent message={`No items for ${InspectionCategoriesDisplayName[categoryId]}`} />
            }
        </div>
    );
};

export default CategoryBlock;
