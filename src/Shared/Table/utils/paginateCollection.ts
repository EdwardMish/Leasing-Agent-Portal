import { PaginatedCollection } from '../Types';

type PagedBuilder<T> = {
    set: PaginatedCollection<T>,
    count: number,
    currentPage: number
}

const initialCollection = <T>({
    set = { 1: [] },
    count = 0,
    currentPage = 1,
}): PagedBuilder<T> => ({
        set,
        count,
        currentPage,
    });

export const paginateCollection = <T>(collection: T[], itemsPerPage: number, options = {}): PaginatedCollection<T> => collection
    .reduce(({
        count,
        currentPage,
        set,
    }: PagedBuilder<T>, curr: T) => (itemsPerPage > count
        ? {
            set: {
                ...set,
                [currentPage]: [
                    ...set[currentPage],
                    {
                        ...curr,
                        tableIndex: `${currentPage}-${count}`,
                    },
                ],
            },
            currentPage,
            count: count + 1,
        }
        : {
            set: {
                ...set,
                [currentPage + 1]: [
                    {
                        ...curr,
                        tableIndex: `${currentPage}-${count}`,
                    },
                ],
            },
            currentPage: currentPage + 1,
            count: 1,
        }), initialCollection<T>(options)).set;
