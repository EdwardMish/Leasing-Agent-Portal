import { SortDirection } from '../Types';

const sortNumeric = (arr) => arr.sort(({ value: a }, { value: b }) => a - b);

const sortNonNumeric = (arr) =>
    arr.sort(({ value: a }, { value: b }) => {

        // Handle any null values
        if (a != null && b == null) return 1;
        if (a == null && b != null) return -1;

        if (a == null && b == null) return 1;

        return a.toString().toLowerCase().localeCompare(b.toString().toLowerCase());
    });

export const sortArray = <T>(
    collection: T[],
    sortColumn: keyof T,
    sortDirection: SortDirection = SortDirection.ASC
): T[] => {
    if (!collection.length) return [];

    const sorted: T[] = (collection.every((val) => isNaN(val[sortColumn] as any) == false) ? sortNumeric : sortNonNumeric)(
        collection.map((s, i) => ({ i, value: s[sortColumn] }))
    ).map(({ i }) => collection[i]);

    return sortDirection === SortDirection.ASC ? sorted : sorted.reverse();
};
