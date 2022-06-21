import * as React from 'react';

const styles = require('./sales-year-tabs.module.css');

const AVAILABLEYEARSTOSHOW = 5;

interface SalesYearTabsProps {
    selectedYear: number;
    handler: React.Dispatch<React.SetStateAction<number>>;
}

const getAvailableYears = (): number[] => {
    const currentYear = (new Date()).getFullYear();

    const availableYears: number[] = [];

    for (let year = currentYear; year >= currentYear - AVAILABLEYEARSTOSHOW; year--) {
        availableYears.push(year);
    }

    return availableYears;
};

export const SalesYearTabs: React.FC<SalesYearTabsProps> = ({ selectedYear, handler }) => {
    const [currentYear, setCurrentYear] = React.useState<number>(selectedYear);

    const setYear = (e: React.SyntheticEvent<HTMLLIElement>) => {
        e.preventDefault();

        const { dataset: { year = '1' } } = e.target as HTMLLIElement;

        const yearInt = parseInt(year);

        setCurrentYear(yearInt);
        handler(yearInt);
    };

    return (
        <ul className={styles.SelectYearTabs}>
            {
                getAvailableYears().map((year) => (<li key={`sales-year-${year}`} onClick={setYear} className={currentYear === year ? styles.ActiveTab : undefined} data-year={year}>{year}</li>))
            }
        </ul>
    );
};
