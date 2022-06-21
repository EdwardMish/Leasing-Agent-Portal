import * as React from 'react';

import { LoadingContent } from 'Shared/PageElements';
import { Search } from 'Shared/Search';
import { Types as TableTypes } from 'Shared/Table';
import { News } from 'API';
import { PagedResponse } from 'Types/api-types/Shared/PagedResponse';
import { List } from './List';
import {
    PagedSortedFilteredRequestParams,
    SortColumn,
    FilterColumn,
    FilterOperation,
} from 'API/Shared/PagedSortedFilteredRequest';

const styles = require('./news-list.module.css');

export const EmergencyNewsList: React.FC<{}> = () => {
    const [newsItemsLoaded, setLoaded] = React.useState<boolean>(false);
    const [newsItems, setNewsItems] = React.useState<News.Types.News[]>([]);
    const [totalCount, setTotalCount] = React.useState<number>(0);

    const [sortColumn] = React.useState<SortColumn[]>([{ columnName: 'Age', sortDirection: TableTypes.SortDirection.ASC }]);
    const [filterColumn, setFilterColumn] = React.useState<FilterColumn[]>([
        { columnNames: ['Type'], value: News.Types.NewsTypes.Emergency, filterOperation: FilterOperation.EQUALS },
    ]);
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [pageSize] = React.useState<number>(10);

    React.useEffect(() => {
        News.API.getNewsItems(new PagedSortedFilteredRequestParams(sortColumn, filterColumn, pageSize, pageNumber)).then(
            (res: PagedResponse<News.Types.News>) => {
                setNewsItems([...newsItems, ...res.results]);
                setTotalCount(res.totalCount);
                setLoaded(true);
            },
        );
    }, [sortColumn, filterColumn, pageNumber, pageSize]);

    const loadMoreItems = () => {
        setPageNumber(pageNumber + 1);
    };
    const handleSearch = (searchValue) => {
        setNewsItems([]);
        setFilterColumn([
            { columnNames: ['Type'], value: News.Types.NewsTypes.Emergency, filterOperation: FilterOperation.EQUALS },
            { columnNames: ['Subject'], value: searchValue, filterOperation: FilterOperation.EQUALS },
        ]);
    };
    const clearSearch = () => {
        setFilterColumn([
            { columnNames: ['Type'], value: News.Types.NewsTypes.Emergency, filterOperation: FilterOperation.EQUALS },
        ]);
    };

    return (
        <>
            <Search
                handler={handleSearch}
                placeholder="Search Emergency News Items"
                cleanUpCallback={clearSearch}
                clearCallback={clearSearch}
            />
            <div className={styles.NewsList}>
                {newsItemsLoaded && newsItems.length > 0 ? (
                    <>
                        <List news={newsItems} />
                        {newsItems.length === totalCount ? (
                            <></>
                        ) : (
                            <button className={styles.ShowMore} onClick={loadMoreItems}>
                                Show More...
                            </button>
                        )}
                    </>
                ) : newsItemsLoaded && newsItems.length === 0 ? (
                    <div>No Emergency New Items Found</div>
                ) : (
                    <LoadingContent />
                )}
            </div>
        </>
    );
};
