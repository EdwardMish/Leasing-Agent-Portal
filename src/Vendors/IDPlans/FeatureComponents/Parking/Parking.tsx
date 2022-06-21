import * as React from 'react';

import { PanelContext } from '../../Panel';
import { IDPlansAPI } from '../../API';
import { LoadingContent, NoContent } from '../../../../Shared/PageElements';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { capitalizeFirstLetter } from '../../../../utils';

const styles = require('./parking.module.css');

export const Parking: React.FC<{}> = () => {
    const propertyId: number = React.useContext(PanelContext);

    const [recordsLoaded, setRecordsLoaded] = React.useState<boolean>(false);
    const [records, setRecords] = React.useState<IDPlansAPI.ParkingResponse[]>([]);

    React.useEffect(() => {
        if (propertyId > 0) {
            IDPlansAPI.getParking(propertyId)
                .then((response) => {
                    setRecords(response);
                    setRecordsLoaded(true);
                });
        }
    }, [propertyId]);

    const filterType = (type: string): string => (type.toLowerCase() === 'handicapped' ? 'ADA Spaces' : capitalizeFirstLetter(type));

    return (
        <>
            {
                recordsLoaded
                    ? (
                        <>
                            {
                                records.length
                                    ? (
                                        <>
                                            {
                                                records.map(({ numberOfSpaces, parkingType }: IDPlansAPI.ParkingResponse) => (
                                                    <FlexWrapper
                                                        key={`parking-record-${parkingType.toLowerCase().replace(' ', '')}-${numberOfSpaces}`}
                                                        justify="start"
                                                        align="center"
                                                        style={{
                                                            margin: '0 0 0.5rem',
                                                        }}
                                                    >
                                                        <p className={styles.TypeOfSpaces}>{`${filterType(parkingType)}:`}</p>
                                                        <p>{numberOfSpaces}</p>
                                                    </FlexWrapper>
                                                ))
                                            }
                                        </>
                                    )
                                    : <NoContent message="There are no records to show." />
                            }
                        </>
                    )
                    : <LoadingContent />
            }
        </>
    );
};
