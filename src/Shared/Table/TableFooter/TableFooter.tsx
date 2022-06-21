import * as React from 'react';

import { HorizontalSelectList } from '../../../Shared/PageElements';
import {
    ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight,
} from '../../../Icons';

const styles = require('./table-footer.module.css');

interface TableFooterProps {
    numberOfRecords: number;
    numberOfRowsDisplayedCallback: (rowsDisplayed: number) => void;
    currentPageCallback: (currentPage: number) => void;
    currentPageOverride: number;
    clearCurrentPageOverride: () => void;
    rowSelectOptions?: { value: number, display: number }[];
}

const defaultRowSelectOptions: { value: number, display: number }[] = [
    { value: 10, display: 10 },
    { value: 25, display: 25 },
    { value: 50, display: 50 },
    { value: 75, display: 75 },
    { value: 100, display: 100 },
];

export const TableFooter: React.FC<TableFooterProps> = ({
    numberOfRecords,
    numberOfRowsDisplayedCallback,
    currentPageCallback,
    currentPageOverride,
    clearCurrentPageOverride,
    rowSelectOptions = defaultRowSelectOptions,
}) => {
    const [numberOfRowsDisplayed, setNumberOfRowsDisplayed] = React.useState<number>(rowSelectOptions[0].value);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    /* Callbacks */
    React.useEffect(() => {
        numberOfRowsDisplayedCallback(numberOfRowsDisplayed);
    }, [numberOfRowsDisplayed]);

    React.useEffect(() => {
        currentPageCallback(currentPage);
    }, [currentPage]);

    React.useEffect(() => {
        setTotalPages(Math.ceil((numberOfRecords / numberOfRowsDisplayed)));
    }, [numberOfRowsDisplayed, numberOfRecords]);

    React.useEffect(() => {
        if (currentPageOverride > 0) {
            setCurrentPage(currentPageOverride);
            clearCurrentPageOverride();
        }
    }, [currentPageOverride]);

    const handleRowCount = (value: number) => {
        setNumberOfRowsDisplayed(value);
    };

    const currentPageDisplay = () => {
        if (numberOfRecords < 1) return '0 of 0';

        const ceiling = (currentPage - 1) * numberOfRowsDisplayed + numberOfRowsDisplayed;

        return `${(currentPage - 1) * numberOfRowsDisplayed + 1} - ${ceiling < numberOfRecords ? ceiling : numberOfRecords} of ${numberOfRecords}`;
    };

    const firstPage = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        setCurrentPage(1);
    };

    const pageLeft = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (currentPage < 2) return;

        setCurrentPage(currentPage - 1);
    };

    const pageRight = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (currentPage >= totalPages) return;

        setCurrentPage(currentPage + 1);
    };

    const lastPage = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        setCurrentPage(totalPages);
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
                    <div onClick={firstPage}><ChevronDoubleLeft /></div>
                    <div onClick={pageLeft}><ChevronLeft /></div>
                    <div onClick={pageRight}><ChevronRight /></div>
                    <div onClick={lastPage}><ChevronDoubleRight /></div>
                </div>
            </div>
        </div>
    );
};
