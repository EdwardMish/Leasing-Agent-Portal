import { hasExtension } from './hasExtension';

const compareFiles = (first: File, second: File): boolean =>
    first.name === second.name &&
    first.size === second.size &&
    first.lastModified === second.lastModified &&
    first.type === second.type;

export const verifyFileUpload = (
    files: File[],
    alreadyRequestedFiles?: string[],
): { files: File[]; warnings: { [error: string]: string } } => {
    const verifiedFiles: File[] = [];
    let warnings: { [error: string]: string } = {};

    files.forEach((file: File) => {
        if (!hasExtension(file.name)) {
            warnings = {
                ...warnings,
                'no-fileExtension': 'Cannot upload a file without an extension.',
            };

            return;
        }

        if (file.size === 0) {
            warnings = {
                ...warnings,
                'no-zero-bytes': 'Cannot upload an empty file.',
            };

            return;
        }

        !verifiedFiles.some((current: File) => compareFiles(file, current))
            ? verifiedFiles.push(file)
            : (warnings = {
                  ...warnings,
                  'no-duplicate-files': 'Cannot upload duplicate files.',
              });

        // if included already requested files, validate if there is not another file with the same name:
        if (alreadyRequestedFiles && alreadyRequestedFiles.length > 0) {
            if (alreadyRequestedFiles.includes(file.name)) {
                warnings = {
                    ...warnings,
                    'repeated-file-name': 'Another file with the same name is already attached',
                };
            }
        }
    });

    return {
        files: verifiedFiles,
        warnings,
    };
};
