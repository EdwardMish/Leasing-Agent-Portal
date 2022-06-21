import * as React from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from '../../../../Icons';
import { HorizontalSelectList } from '../../../../Shared/PageElements';
import { listRows as defaultRowSelectOptions } from './LeadTypes';

import styles from './table-footer.module.css';

interface TableFooterProps {
    numberOfRecords: number;
    numberOfRowsDisplayed: number;
    numberOfRowsDisplayedCallback: (rowsDisplayed: number) => void;
    currentPageCallback: (currentPage: number) => void;
    currentPage: number;
    rowSelectOptions?: { value: number; display: number }[];
}

/** A stateless version of Table.Footer component, it recieves currenPage and is not using currentPageOverride */
const TableFooter: React.FC<TableFooterProps> = ({
    numberOfRecords,
    numberOfRowsDisplayed,
    numberOfRowsDisplayedCallback,
    currentPageCallback,
    currentPage,
    rowSelectOptions = defaultRowSelectOptions,
}) => {
    const [totalPages, setTotalPages] = React.useState<number>(1);

    /* Callbacks */
    React.useEffect(() => {
        numberOfRowsDisplayedCallback(numberOfRowsDisplayed);
    }, [numberOfRowsDisplayed]);

    React.useEffect(() => {
        setTotalPages(Math.ceil(numberOfRecords / numberOfRowsDisplayed));
    }, [numberOfRowsDisplayed, numberOfRecords]);

    const handleRowCount = (value: number) => {
        numberOfRowsDisplayedCallback(value);
    };

    const currentPageDisplay = () => {
        if (numberOfRecords < 1) return '0 of 0';

        const ceiling = (currentPage - 1) * numberOfRowsDisplayed + numberOfRowsDisplayed;

        return `${(currentPage - 1) * numberOfRowsDisplayed + 1} - ${
            ceiling < numberOfRecords ? ceiling : numberOfRecords
        } of ${numberOfRecords}`;
    };

    const firstPage = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        currentPageCallback(1);
    };

    const pageLeft = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (currentPage < 2) return;
        currentPageCallback(currentPage - 1);
    };

    const pageRight = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (currentPage >= totalPages) return;
        currentPageCallback(currentPage + 1);
    };

    const lastPage = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();
        currentPageCallback(totalPages);
    };

    return (
        <div className={styles.TableFooter}>
            <HorizontalSelectList
                display={`Rows: ${numberOfRowsDisplayed}`}
                handler={handleRowCount}
                options={rowSelectOptions}
            />
            <div className={styles.PaginationBlock}>
                <p>{currentPageDisplay()}</p>
                <div className={styles.PaginationIconSet}>
                    <div onClick={firstPage}>
                        <ChevronDoubleLeft />
                    </div>
                    <div onClick={pageLeft}>
                        <ChevronLeft />
                    </div>
                    <div onClick={pageRight}>
                        <ChevronRight />
                    </div>
                    <div onClick={lastPage}>
                        <ChevronDoubleRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableFooter;
