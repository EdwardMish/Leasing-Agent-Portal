import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentUserState, Occupants } from '../../../../State';
import { mapOccupantResponseToOccupant } from '../../../../utils/Mappers';
import { LocationInputs } from '../LocationInputs';
import { OccupantAPI, OccupantTypes } from 'API/Occupant';

const styles = require('../location-selector.module.css');

interface SingleLocationProps {
    occupantId: number;
}

const { Actions, selectors } = Occupants;

export const SingleLocation: React.FC<SingleLocationProps> = ({ occupantId }) => {
    const dispatch = useDispatch();

    // TODO: Should move to GET OCCUPANT when available, dropping requirement of User Id
    const currentUserId: number = useSelector(CurrentUserState.selectors.currentUserId);

    const occupant: Occupants.Types.Occupant = useSelector(selectors.occupant(occupantId));
    const occupantIsLoaded: boolean = useSelector(selectors.occupantIsLoaded(occupantId));

    React.useEffect(() => {
        if (!occupantIsLoaded) {
            // TODO: Should move to GET OCCUPANT when available
            OccupantAPI.getOccupantsOfUser(currentUserId).then(
                ({ occupants: occupantsResponse }: { occupants: OccupantTypes.Occupant[] }) => {
                    dispatch({
                        type: Actions.ADD_OCCUPANTS,
                        payload: occupantsResponse.map((o) => mapOccupantResponseToOccupant(o)),
                    });
                },
            );
        }
    }, [occupantIsLoaded]);

    return (
        <>
            <p className={styles.TagLine}>Creating a request for:</p>
            <p className={styles.OccupantName}>{`${occupant.name} @ ${occupant.propertyName}`}</p>
            <LocationInputs occupantId={occupant.id} propertyId={occupant.propertyId} />
        </>
    );
};

