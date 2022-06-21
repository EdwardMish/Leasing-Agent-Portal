import { FeatureFlagsAPI } from 'API/FeatureFlags';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { FeatureFlagActions as Actions, FeatureFlagActionTypes as ActionTypes } from '../actions';
import { featureFlagsLoadStatus } from '../selectors';

export const FeatureFlagsLoader: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const featuresLoadStatus = useSelector(featureFlagsLoadStatus);

    React.useEffect(() => {
        if (featuresLoadStatus === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: Actions.LOAD_FEATURE_FLAGS,
            } as ActionTypes);

            FeatureFlagsAPI.getAllFeatureFlags().then((flags) => {
                dispatch({
                    type: Actions.SET_FEATURE_FLAGS,
                    payload: flags,
                } as ActionTypes);
            });
        }
    }, [featuresLoadStatus]);

    return null;
};

