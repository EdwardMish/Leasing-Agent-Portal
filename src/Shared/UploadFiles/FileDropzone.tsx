import * as React from 'react';

interface FileDropzoneProps {
    disabled: boolean;
    onFilesAdded: (fileList: FileList) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ children, disabled, onFilesAdded }) => {
    const handleDragging = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (disabled) return;

        const { files } = e.dataTransfer;

        onFilesAdded(files);
    };

    return (
        <div
            onDragOver={handleDragging}
            onDrop={handleDrop}
        >
            {children}
        </div>
    );
};

export default FileDropzone;
