import * as React from 'react';

import { Types as TableTypes } from '../../../../Shared/Table';
import { PanelContext } from '../../Panel';
import { IDPlansAPI } from '../../API';
import { IDPlansTableWrapper } from '../IDPlansTableWrapper';

const tableColumns: TableTypes.TableColumn[] = [
    {
        display: 'Space',
        width: '3rem',
        operator: IDPlansAPI.HVACColumns.space,
    },
    {
        display: 'Manufacturer',
        width: 'calc(100% - 27rem)',
        operator: IDPlansAPI.HVACColumns.manufacturer,
    },
    {
        display: 'Model',
        width: '10rem',
        operator: IDPlansAPI.HVACColumns.model,
    },
    {
        display: 'Tonnage',
        width: '3rem',
        operator: IDPlansAPI.HVACColumns.tonnage,
    },
    {
        display: 'Serial #',
        width: '8rem',
        operator: IDPlansAPI.HVACColumns.serialNumber,
    },
    {
        display: 'Year',
        width: '3rem',
        operator: IDPlansAPI.HVACColumns.year,
    },
];

export const HVAC: React.FC<{}> = () => {
    const propertyId: number = React.useContext(PanelContext);

    const [recordsLoaded, setRecordsLoaded] = React.useState<boolean>(false);
    const [records, setRecords] = React.useState<IDPlansAPI.HVACResponse[]>([]);

    React.useEffect(() => {
        if (propertyId > 0) {
            IDPlansAPI.getHVAC(propertyId)
                .then((response) => {
                    setRecords(response);
                    setRecordsLoaded(true);
                });
        }
    }, [propertyId]);

    return (
        <IDPlansTableWrapper
            columns={tableColumns}
            dataRecords={records}
            recordsLoaded={recordsLoaded}
            rowKeys={[
                IDPlansAPI.HVACColumns.manufacturer,
                IDPlansAPI.HVACColumns.serialNumber,
                IDPlansAPI.HVACColumns.year,
                IDPlansAPI.HVACColumns.space,
            ]}
        >
            {(dataRecord) => (
                tableColumns.map(({ operator, width }) => (
                    <p
                        key={`table-row-${dataRecord.serialNumber}-${dataRecord.year}-${operator}-${dataRecord.space}`}
                        style={{
                            width,
                            fontSize: '0.75rem',
                            lineHeight: '1.5rem',
                        }}
                    >
                        {dataRecord[operator]}
                    </p>
                ))
            )}
        </IDPlansTableWrapper>
    );
};
