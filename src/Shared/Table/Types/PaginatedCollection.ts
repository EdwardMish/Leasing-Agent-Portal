export interface PaginatedCollection<T> {
    [pageNumber: number]: Array<T & { tableIndex: string }>
}
