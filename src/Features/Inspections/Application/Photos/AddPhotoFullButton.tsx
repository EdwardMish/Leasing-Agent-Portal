import * as React from 'react';

import { Camera, IconColors } from '../../../../Icons';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import UploadFiles from '../../../../Shared/UploadFiles';

interface Properties {
    addFiles: (files: File[]) => void;
}

const AddPhotoFullButton = ({ addFiles }: Properties): React.ReactElement => (
    <UploadFiles addFilesCallback={addFiles} accept='.gif,.jpg,.jpeg,.png,.bmp'>
        <FlexWrapper
            align='center'
            justify='center'
            column
            style={{
                margin: '15vh auto',
                border: `2px solid ${IconColors.BrandBlue}`,
                borderRadius: '50%',
                height: '10rem',
                width: '10rem',
            }}
        >
            <Camera
                color={IconColors.BrandBlue}
                aspect='5rem'
                style={{
                    margin: '-0.5rem 0 0',
                    strokeWidth: '1px',
                }}
            />
            <p style={{
                margin: '0.25rem 0 0',
                fontSize: '0.875rem',
                lineHeight: 1,
                color: IconColors.BrandBlue,
                textTransform: 'uppercase',
                fontWeight: 700,
            }}>Add Photo</p>
        </FlexWrapper>
    </UploadFiles>
)

export default AddPhotoFullButton;
