import * as React from 'react';
import defaultMimeTypes from 'Shared/UploadFiles/defaultMimeTypes';

import FileDropzone from './FileDropzone';

interface UploadFilesProps {
    addFilesCallback: (files: File[]) => void;
    disableInput?: boolean;
    disableDropper?: boolean;
    accept?: string;
    multiple?: boolean;
}

const fileListToArray = (list: FileList) => {
    const a: File[] = [];

    for (let i = 0; i < list.length; i += 1) {
        const listItem: File | null = list.item(i);

        if (listItem) a.push(listItem);
    }

    return a;
};

const UploadFiles: React.FC<UploadFilesProps> = ({
    addFilesCallback,
    children,
    disableInput = false,
    disableDropper = false,
    accept = defaultMimeTypes,
    multiple = true,
}) => {
    const fileLoader: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

    const openFileUpload = () => {
        if (disableInput || !fileLoader) return;

        const { current } = fileLoader as React.MutableRefObject<HTMLInputElement>;

        current?.click();
    };

    const handleDropper = (fileList: FileList): void => {
        addFilesCallback(fileListToArray(fileList));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') openFileUpload();
    };

    const handleInput = (val: React.ChangeEvent<HTMLInputElement>) => {
        if (val?.target?.files) addFilesCallback(fileListToArray(val.target.files));
    };

    return (
        <FileDropzone disabled={disableDropper || disableInput} onFilesAdded={handleDropper}>
            <div onClick={openFileUpload} onKeyDown={handleKeyDown} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
                <input
                    ref={fileLoader}
                    style={{
                        display: 'none',
                    }}
                    type="file"
                    multiple={multiple}
                    onChange={handleInput}
                    accept={accept}
                />
                {children}
            </div>
        </FileDropzone>
    );
};

export default UploadFiles;

