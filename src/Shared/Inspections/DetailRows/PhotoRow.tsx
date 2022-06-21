import * as React from 'react';
import { format } from 'date-fns';

import { Photo } from '../../../State/Inspections/Types/Photo';
import { InspectionCategoriesDisplayName } from '../../../State/Inspections/Types/InspectionCategories';

import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { IconColors } from '../../../Icons';

import styles = require('./photo-row.module.css');
import PhotoLoader from './PhotoLoader';

const secondaryStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: IconColors.LightGrey,
    fontStyle: 'italic',
};

const PhotoRow: React.FC<{
    inspectionId: number | string;
    photo: Photo;
}> = ({ inspectionId, photo }) => (
    <FlexWrapper
        align="center"
        justify="between"
        className={styles.PhotoRow}
        style={{
            width: '100%',
            padding: '1rem',
            margin: 0,
            borderBottom: `1px solid ${IconColors.OffWhite}`,
        }}
    >
        <PhotoLoader
            photoUrl={`${API_ROOT}/inspections/${inspectionId}/items/${photo.id}/images/${photo.imageId}/thumbnail`}
            previewUrl={`${API_ROOT}/inspections/${inspectionId}/items/${photo.id}/images/${photo.imageId}/full`}
            style={{ marginRight: '2rem' }}
        />
        <FlexWrapper align="start" justify="between" column style={{ width: '100%', height: '8rem' }}>
            {photo.note ? (
                <p
                    style={{
                        margin: '0 0 1rem',
                        lineHeight: '1.6',
                    }}
                >
                    {photo.note}
                </p>
            ) : (
                <p
                    style={{
                        ...secondaryStyle,
                        margin: '0 0 1rem',
                    }}
                >
                    No caption set.
                </p>
            )}
            <FlexWrapper align="center" justify="between" style={{ width: '100%' }}>
                <p style={secondaryStyle}>{InspectionCategoriesDisplayName[photo.categoryId]}</p>
                {photo.createdDate && (
                    <p style={secondaryStyle}>{format(new Date(photo.createdDate), 'LL/dd/yy - hh:mm')}</p>
                )}
            </FlexWrapper>
        </FlexWrapper>
    </FlexWrapper>
);

export default PhotoRow;
