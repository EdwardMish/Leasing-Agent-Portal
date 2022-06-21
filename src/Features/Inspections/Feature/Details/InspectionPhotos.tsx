import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IconColors } from '../../../../Icons';

import PhotoRow from '../../../../Shared/Inspections/DetailRows/PhotoRow';
import { NoContent } from '../../../../Shared/PageElements';

import { selectors } from '../../../../State/Inspections/Feature';
import { Photo } from '../../../../State/Inspections/Types/Photo';

const InspectionPhotos = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const photos: Photo[] = useSelector(selectors.photos(inspectionId));

    return (
        <>
            {!!photos && !!photos.length ? (
                <>
                    {photos.map((photo: Photo) => (
                        <div
                            key={`photo-list-${photo.id}`}
                            style={{
                                border: photo.followUp
                                    ? `1px solid ${IconColors.BrandBlue}`
                                    : `1px solid ${IconColors.OffWhite}`,
                                margin: '0 0 0.5rem',
                                borderRadius: '0.25rem',
                                overflow: 'hidden',
                            }}
                        >
                            <PhotoRow photo={photo} inspectionId={inspectionId} />
                            {photo.followUp && (
                                <p
                                    style={{
                                        backgroundColor: IconColors.BrandBlue,
                                        color: 'white',
                                        display: 'block',
                                        lineHeight: '1.5rem',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.25rem',
                                        margin: 0,
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    Requires Followup
                                </p>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <NoContent message="No Notes to Display" />
            )}
        </>
    );
};

export default InspectionPhotos;
