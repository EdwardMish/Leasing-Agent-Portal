import { RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { FilterColumn, FilterOperation } from '../../API/Shared/PagedSortedFilteredRequest';
import { Types } from '../../Shared/Table';
import { defaultColumns } from '../Requests/List/defaultColumns';
import { ListWrapper } from '../Requests/List/ListWrapper';

interface OccupantRequestsProps {
    occupantId: number | string;
}

const OccupantRequests: React.FC<OccupantRequestsProps> = ({ occupantId }) => {
    const columns: Types.TableColumn[] = defaultColumns;

    const filterOverrides = [
        {
            columnNames: ['occupantId'],
            value: occupantId,
            filterOperation: FilterOperation.EQUALS,
        } as FilterColumn,
    ];

    return (
        <>
            <ListWrapper
                columns={columns}
                workflow={RequestsTypes.RequestWorkflows.All}
                searchPlaceholder="Search Active Requests"
                filterOverrides={filterOverrides}
                sharedStoreId="locations"
            />
        </>
    );
};

export default OccupantRequests;

