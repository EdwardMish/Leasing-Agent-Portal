import { DirectoryAPI, DirectoryTypes } from 'API/Directory';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { DirectoryActions, DirectoryActionTypes } from '../actions';
import * as selectors from '../selectors';
import { DirectoryPropertyWithOccupants } from '../Types';

type DirectoryStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
};

export const usePropertiesFromDirectoryState: DirectoryStateHook = () => {
    const dispatch = useDispatch();

    const loadState: LoadStatus = useSelector(selectors.propertiesLoadStatus);

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE || loadState === LoadStatus.ERROR) {
            dispatch({
                type: DirectoryActions.LOAD_PROPERTIES,
            });

            DirectoryAPI.getProperties()
                .then((properties: DirectoryTypes.DirectoryProperty[]) => {
                    dispatch({
                        type: DirectoryActions.SET_PROPERTIES,
                        payload: properties.map(
                            ({ id, name, occupants }) =>
                                ({
                                    id,
                                    name,
                                    occupants: occupants.map(({ id, name, phone, associated }) => ({
                                        id,
                                        name,
                                        phone,
                                        canEdit: associated,
                                    })),
                                } as DirectoryPropertyWithOccupants),
                        ),
                    } as DirectoryActionTypes);
                })
                .catch((error) => {
                    dispatch({
                        type: DirectoryActions.SET_PROPERTIES_ERROR_STATE,
                        payload: {
                            errorMessage: !!error?.code ? error.code : 'We were not able to load properties.',
                        },
                    });
                });
        }
    }, [loadState]);

    return {
        areLoaded: loadState === LoadStatus.LOADED,
        areLoading: loadState === LoadStatus.PENDING,
        hasError: loadState === LoadStatus.ERROR,
        loadState,
    };
};

