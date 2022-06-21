import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, ActionTypes, selectors } from '..';
import { CurrentUserState, Shared } from '../..';
import { LoadStatus } from '../../../Types';
import { WelcomeActions } from '../actions';
import { Occupant, OccupantAddress } from '../Types';
import { OccupantAPI, OccupantTypes } from 'API/Occupant';

type WelcomeStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
    occupantsRequiringSetup: Occupant[];
    firstOccupantToSetup: Occupant;
};

export const useOccupantsFromWelcomeState: WelcomeStateHook = () => {
    const dispatch = useDispatch();

    const currentUserIsLoaded: boolean = useSelector(CurrentUserState.selectors.currentUserIsLoaded);
    const currentUserOccupantsRequiringSetup: Shared.Types.Occupant[] = useSelector(
        CurrentUserState.selectors.currentUserOccupantsWithIncompleteSetup,
    );

    const loadState: LoadStatus = useSelector(selectors.occupantsLoadStatus);

    const occupantsRequiringSetup: Occupant[] = useSelector(selectors.occupantsRequiringSetup);

    const firstOccupantToSetup: Occupant = useSelector(selectors.occupantToSetup);

    React.useEffect(() => {
        if (currentUserIsLoaded) {
            if (loadState === LoadStatus.INITIAL_STATE || loadState === LoadStatus.ERROR) {
                dispatch({
                    type: WelcomeActions.LOAD_OCCUPANTS,
                });

                Promise.all<OccupantTypes.Occupant>(
                    currentUserOccupantsRequiringSetup.map((_) => OccupantAPI.getOccupant(_.occupantId)),
                ).then((values) => {
                    dispatch({
                        type: Actions.ADD_OCCUPANTS,
                        payload: values.map(
                            (o) =>
                                ({
                                    setup: false,
                                    id: o.id,
                                    name: o.marketingName,
                                    phone: o.phone,
                                    propertyId: o.propertyId,
                                    propertyName: o.propertyName,
                                    physicalAddress: o.physicalAddress as OccupantAddress,
                                    mailingAddress: o.mailingAddress as OccupantAddress,
                                } as Occupant),
                        ),
                    } as ActionTypes);
                });
            }
        }
    }, [currentUserIsLoaded, loadState]);

    return {
        areLoaded: loadState === LoadStatus.LOADED,
        areLoading: loadState === LoadStatus.PENDING,
        hasError: loadState === LoadStatus.ERROR,
        loadState,
        occupantsRequiringSetup,
        firstOccupantToSetup,
    };
};

