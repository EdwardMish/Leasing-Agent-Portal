import * as selectors from './selectors';
import * as Types from './Types';

import { InspectionsFeatureState as State } from './Types/InspectionsFeatureState';
import { InspectionsFeatureActions as Actions, InspectionsFeatureActionTypes as ActionTypes } from './actions';
import reducer from './reducer';

export {
    Actions,
    ActionTypes,
    reducer,
    selectors,
    State,
    Types,
};
