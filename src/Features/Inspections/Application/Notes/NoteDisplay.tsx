import * as React from 'react';
import { CheckMark, Close, IconColors, Pencil } from '../../../../Icons';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { InspectionCategoriesDisplayName } from '../../../../State/Inspections/Types/InspectionCategories';

import styles = require('../inspections.module.css');

interface NoteDisplayProps {
    id: number;
    categoryId: number;
    followUp: boolean;
    display: string;
    editable?: boolean;
    onEdit?: (noteId: number) => void;
    cancelEdit?: () => void;
    isEditing?: boolean;
}

const NoteDisplay: React.FC<NoteDisplayProps> = ({
    id,
    categoryId,
    followUp,
    display,
    editable = false,
    onEdit = () => {},
    cancelEdit = () => {},
    isEditing = false,
}) => (
    <div className={styles.InspectionItem}>
        <FlexWrapper align="start" justify="between">
            <div style={{ marginRight: '0.75rem' }}>
                <p style={{ margin: 0, lineHeight: '1.5', wordBreak: 'break-word' }}>{display}</p>
                <p style={{ margin: '0.5rem 0 0' }} className={styles.InspectionItemCategory}>
                    {InspectionCategoriesDisplayName[categoryId]}
                </p>
            </div>
            {editable && (
                <FlexWrapper align="center" justify="center" style={{ width: '2rem', height: '2rem' }}>
                    {!isEditing && (
                        <div onClick={() => onEdit(id)} style={{ cursor: 'pointer' }}>
                            <Pencil aspect="1.5rem" color={IconColors.BrandBlue} />
                        </div>
                    )}
                    {isEditing && (
                        <div onClick={() => cancelEdit()} style={{ cursor: 'pointer' }}>
                            <Close aspect="1.5rem" color={IconColors.BrandBlue} />
                        </div>
                    )}
                </FlexWrapper>
            )}
        </FlexWrapper>
        {followUp && (
            <div className={`${styles.Featured}`}>
                <CheckMark aspect=".75rem" color={IconColors.BrandBlue} />
            </div>
        )}
        <FlexWrapper align="start" justify="center">
            {isEditing && (
                <p onClick={cancelEdit} style={{ cursor: 'pointer' }}>
                    Editing (<span style={{ color: 'var(--color-BrandBlue)' }}>Cancel</span>)
                </p>
            )}
        </FlexWrapper>
    </div>
);

export default NoteDisplay;

