import * as React from 'react';

import { News } from '../../../../API';
import {
    FilterColumn,
    FilterOperation,
    PagedSortedFilteredRequestParams,
    SortColumn,
} from '../../../../API/Shared/PagedSortedFilteredRequest';

import { LoadingContent, NoContent } from '../../../../Shared/PageElements';
import { Search } from '../../../../Shared/Search';
import { Types as TableTypes } from '../../../../Shared/Table';

import { PagedResponse } from '../../../../Types/api-types/Shared/PagedResponse';

import { List } from './List';

const styles = require('./news-list.module.css');

export interface NewsListProperties {
    type?: News.Types.NewsTypes;
}

export const AllNewsList: React.FC<NewsListProperties> = ({ type }) => {
    const defaultFilterColumn = (): FilterColumn[] => (type
        ? [{ columnNames: ['Type'], value: type.toLowerCase(), filterOperation: FilterOperation.EQUALS }]
        : []);

    const [newsItemsLoaded, setLoaded] = React.useState<boolean>(false);
    const [newsItems, setNewsItems] = React.useState<News.Types.News[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);

    const [sortColumn] = React.useState<SortColumn[]>([
        { columnName: 'Age', sortDirection: TableTypes.SortDirection.ASC },
    ]);
    const [filterColumn, setFilterColumn] = React.useState<FilterColumn[]>(defaultFilterColumn());
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [pageSize] = React.useState<number>(10);

    React.useEffect(() => {
        setFilterColumn(defaultFilterColumn());
        setNewsItems([]);
    }, [type]);

    React.useEffect(() => {
        News.API.getNewsItems(
            new PagedSortedFilteredRequestParams(sortColumn, filterColumn, pageSize, pageNumber),
        ).then((res: PagedResponse<News.Types.News>) => {
            setNewsItems([...newsItems, ...res.results]);
            setTotalCount(res.totalCount);
            setLoaded(true);
        });
    }, [sortColumn, filterColumn, pageNumber, pageSize]);

    const loadMoreItems = () => {
        setPageNumber(pageNumber + 1);
    };
    const handleSearch = (searchValue) => {
        setNewsItems([]);
        setFilterColumn([
            ...defaultFilterColumn(),
            { columnNames: ['Subject'], value: searchValue, filterOperation: FilterOperation.EQUALS },
        ]);
    };
    const clearSearch = () => {
        setFilterColumn(defaultFilterColumn());
    };

    return (
        <>
            {newsItemsLoaded ? (
                <>
                    <Search
                        handler={handleSearch}
                        placeholder="Search News Items"
                        cleanUpCallback={clearSearch}
                        clearCallback={clearSearch}
                    />
                    <div className={styles.NewsList}>
                        {newsItems.length ? (
                            <>
                                <List news={newsItems} />
                                {newsItems.length < totalCount && (
                                    <button className={styles.ShowMore} onClick={loadMoreItems}>
                                        Show More...
                                    </button>
                                )}
                            </>
                        ) : (
                            <NoContent message="No News Available." />
                        )}
                    </div>
                </>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
