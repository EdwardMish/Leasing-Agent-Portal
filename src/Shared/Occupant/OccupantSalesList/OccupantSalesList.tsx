import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { ListOfRecords } from './ListOfRecords';
import { parseQueryParam } from '../../../utils';
import { SalesYearTabs } from '../../Sales';

interface OccupantSalesListProps {
    occupantId: number | string;
}

const currentYear: number = new Date(Date.now()).getFullYear();

export const OccupantSalesList: React.FC<OccupantSalesListProps> = ({ occupantId }) => {
    const { search } = useLocation();

    const defaultYear = !!search && parseQueryParam(search) || currentYear;

    const [year, setYear] = React.useState<number>(defaultYear);

    return (
        <>
            <SalesYearTabs handler={setYear} selectedYear={year} />
            <ListOfRecords occupantId={occupantId} year={year} />
        </>
    );
};
