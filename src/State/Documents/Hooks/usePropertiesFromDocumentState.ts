import { Documents } from 'API';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { DocumentActions, DocumentActionTypes } from '../actions';
import * as selectors from '../selectors';
import { DocumentPropertyWithOccupants } from '../Types';

type DocumentStateHook = () => {
    areLoaded: boolean;
    areLoading: boolean;
    hasError: boolean;
    loadState: LoadStatus;
    propertiesWithOccupants: DocumentPropertyWithOccupants[];
};

export const usePropertiesFromDocumentState: DocumentStateHook = () => {
    const dispatch = useDispatch();

    const loadState: LoadStatus = useSelector(selectors.propertiesLoadStatus);

    const propertiesWithOccupants: DocumentPropertyWithOccupants[] = useSelector(selectors.properties);

    React.useEffect(() => {
        if (loadState === LoadStatus.INITIAL_STATE || loadState === LoadStatus.ERROR) {
            dispatch({
                type: DocumentActions.LOAD_PROPERTIES,
            });

            Documents.API.getPropertiesWithOccupants()
                .then((properties: Documents.Types.PropertyWithOccupants[]) => {
                    dispatch({
                        type: DocumentActions.SET_PROPERTIES,
                        payload: properties as DocumentPropertyWithOccupants[],
                    } as DocumentActionTypes);
                })
                .catch((error) => {
                    dispatch({
                        type: DocumentActions.SET_PROPERTIES_ERROR_STATE,
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
        propertiesWithOccupants,
    };
};

