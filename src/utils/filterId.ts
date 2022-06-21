export const filterId = (id: number, set: number[]): number[] => {
    const index = set.indexOf(id);

    return index === -1
        ? [...set, id]
        : [...set.slice(0, index), ...set.slice(index + 1)];
};
