import * as selectors from './selectors'
import * as Types from './Types'

import { ContactState as State } from './Types/ContactState'
import { ContactActions as Actions, ContactActionTypes as ActionTypes } from './actions'
import { contactsReducer as reducer } from './reducer'

export {
    Actions,
    ActionTypes,
    reducer,
    selectors,
    State,
    Types,
}