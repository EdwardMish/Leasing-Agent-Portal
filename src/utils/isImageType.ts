export const isImageType = (name: string): boolean => {
    const reg = new RegExp('.*[.](png|jpg|jpeg|gif|bmp)$');
    return reg.test(name);
};
