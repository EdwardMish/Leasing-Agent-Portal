/**
 *
 * @param param0 An object with 2 attributes name: the original file name, an url created with URL.createObjectURL (to store an image in redux in example)
 * @returns A File object equivalent to the one passed as parameter for URL.createObjectURL
 */
const convertURLBlobToFile = async ({ name, url, type = 'image/*' }) => {
    const decodedName = decodeURI(name);
    return await fetch(url)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], decodedName, { type: type }));
};

export default convertURLBlobToFile;
