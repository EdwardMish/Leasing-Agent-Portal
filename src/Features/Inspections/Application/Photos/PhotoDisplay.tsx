import * as React from 'react';
import { Link } from 'react-router-dom';

import { InspectionCategoriesDisplayName } from '../../../../State/Inspections/Types';
import { Photo } from '../../../../State/Inspections/Types/Photo';

import { CheckMark, IconColors, Pencil } from '../../../../Icons';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';

import PhotoComponent from './Photo';

import styles = require('../inspections.module.css');

interface Properties {
    inspectionId: number;
    photo: Photo;
    propertyId: number;
    width?: string;
    height?: string;
}

export default ({ inspectionId, photo, propertyId, width = '7rem', height = '3.93rem' }: Properties): React.ReactElement => (
    <Link
        style={{ display: 'block', marginTop: '1rem' }}
        key={`photo-upload-${photo.id}`}
        to={`/app/inspections/${propertyId}/photos/${photo.id}`}
    >
        <FlexWrapper align="stretch" justify="between">
            <PhotoComponent inspectionId={inspectionId} photo={photo} style={{ width, height }} />
            <FlexWrapper
                className={styles.InspectionItem}
                align="stretch"
                justify="between"
                style={{
                    width: `calc(100% - ${width})`,
                    margin: '0 0 0 0.5rem',
                }}
            >
                <div style={{ width: '100%' }}>
                    {photo.note && photo.note.length > 0 ? (
                        <p style={{ color: 'black' }}>{photo.note}</p>
                    ) : (
                        <p
                            style={{
                                color: IconColors.LightGrey,
                                fontStyle: 'italic',
                            }}
                        >
                            No Caption Set
                        </p>
                    )}
                    <p
                        style={{
                            margin: '0.5rem 0 0',
                            color: IconColors.DarkGrey,
                        }}
                        className={styles.InspectionItemCategory}
                    >
                        {InspectionCategoriesDisplayName[photo.categoryId]}
                    </p>
                </div>
                <div style={{ width: '2rem', height: '2rem' }}>
                    <Pencil aspect="1.5rem" color={IconColors.BrandBlue} />
                </div>
                {photo.followUp && (
                    <div className={`${styles.Featured}`}>
                        <CheckMark aspect=".75rem" color={IconColors.BrandBlue} />
                    </div>
                )}
            </FlexWrapper>
        </FlexWrapper>
    </Link>
);
