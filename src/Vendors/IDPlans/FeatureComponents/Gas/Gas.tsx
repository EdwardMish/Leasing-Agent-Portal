import * as React from 'react';

import { Types as TableTypes } from '../../../../Shared/Table';
import { meterColumn } from '../../utils';
import { PanelContext } from '../../Panel';
import { IDPlansAPI } from '../../API';
import { IDPlansTableWrapper } from '../IDPlansTableWrapper';

const tableColumns: TableTypes.TableColumn[] = [
    {
        display: 'Space',
        width: 'calc(100% - 7rem)',
        operator: IDPlansAPI.GasColumns.space,
    },
    meterColumn(IDPlansAPI.GasColumns.meterNumber),
];

export const Gas: any = () => {
    const propertyId: number = React.useContext(PanelContext);

    const [recordsLoaded, setRecordsLoaded] = React.useState<boolean>(false);
    const [records, setRecords] = React.useState<IDPlansAPI.GasResponse[]>([]);

    React.useEffect(() => {
        if (propertyId > 0) {
            IDPlansAPI.getGas(propertyId)
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
                IDPlansAPI.GasColumns.space,
                IDPlansAPI.GasColumns.meterNumber,
            ]}
        >
            {(dataRecord) => (
                tableColumns.map(({ operator, width }) => (
                    <p
                        key={`table-row-${dataRecord.space}-${dataRecord.meterNumber}-${operator}`}
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
