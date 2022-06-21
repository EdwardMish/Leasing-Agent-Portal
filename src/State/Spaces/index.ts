import * as selectors from './selectors'
import * as Types from './Types'

import { SpacesState as State } from './Types/SpacesState'
import { SpaceActions as Actions, SpaceActionTypes as ActionTypes } from './actions'
import { spacesReducer as reducer } from './reducer'

export {
    Actions,
    ActionTypes,
    reducer,
    selectors,
    State,
    Types,
}