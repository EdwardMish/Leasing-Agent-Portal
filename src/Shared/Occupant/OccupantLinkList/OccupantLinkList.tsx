import * as React from 'react';
import { Link } from 'react-router-dom';

import { DirectoryState, Occupants } from '../../../State';

import { FlexWrapper } from '../../FlexWrapper';
import { NoContent, PhoneIconRow } from '../../PageElements';

const styles = require('./occupant-link-list.module.css');

type Occupant = Occupants.Types.Occupant | DirectoryState.Types.DirectoryOccupant

interface OccupantLinkListProps {
    occupants: Occupant[];
    propertyId: number;
    rootPath: string;
    hideNonEditable?: boolean;
    linkBuilder?: (propertyId: number, id: number) => string;
}

export const OccupantLinkList: React.FC<OccupantLinkListProps> = ({
    occupants,
    propertyId,
    rootPath,
    linkBuilder,
    hideNonEditable = false,
}) => (
    <>
        {
            occupants.length
                ? occupants
                    .filter((o: Occupant) => o.canEdit)
                    .map(({ id, name, phone }: Occupant) => (
                        <Link
                            key={`occupant-link-list-${id}`}
                            to={linkBuilder ? linkBuilder(propertyId, id) : `${rootPath}/${propertyId}/${id}`}
                            className={styles.OccupantLink}
                        >
                            <h3>{name}</h3>
                            <PhoneIconRow color="#0071ce" phone={phone} />
                        </Link>
                    ))
                : <NoContent message="No Neighbors to show." />
        }
        {
            !hideNonEditable
            && (
                <FlexWrapper wrap justify="between" align="start">
                    {
                        occupants
                            .filter((o: Occupant) => !(o.canEdit))
                            .map(({ id, name, phone }: Occupant) => (
                                <div className={styles.OccupantCard} key={`occupant-card-ne-${id}`}>
                                    <h3>{name}</h3>
                                    <PhoneIconRow color="rgb(70, 81, 100)" phone={phone} />
                                </div>
                            ))
                    }
                </FlexWrapper>
            )
        }
    </>
);
