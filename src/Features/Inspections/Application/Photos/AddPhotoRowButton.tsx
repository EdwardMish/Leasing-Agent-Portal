import * as React from 'react';

import { Camera, IconColors } from '../../../../Icons';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import UploadFiles from '../../../../Shared/UploadFiles';

interface Properties {
    addFiles: (files: File[]) => void;
}

const AddPhotoRowButton = ({ addFiles }: Properties): React.ReactElement => (
    <UploadFiles addFilesCallback={addFiles} accept='.gif,.jpg,.jpeg,.png,.bmp'>
        <FlexWrapper
            align='center'
            justify='between'
            style={{
                margin: '1rem 0',
                padding: '0.75rem',
                border: `1px solid ${IconColors.BrandBlue}`,
                borderRadius: '0.25rem',
                height: '3rem',
                width: '100%',
            }}
        >
            <Camera
                color={IconColors.BrandBlue}
                aspect='2rem'
                style={{
                    strokeWidth: '1px',
                }}
            />
            <p style={{
                display: 'block',
                width: 'calc(100% - 2.65rem)',
                margin: '0.25rem 0 0',
                fontSize: '0.875rem',
                lineHeight: 1,
                color: IconColors.BrandBlue,
                textTransform: 'uppercase',
                letterSpacing: '0.1rem',
            }}>Add Photo</p>
        </FlexWrapper>
    </UploadFiles>
)

export default AddPhotoRowButton;
