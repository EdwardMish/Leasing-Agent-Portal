import { createSelector } from 'reselect'

import { State } from '../../Types'

const toastMessageState = ({ toastMessages }: State) => toastMessages

export const toastMessages = createSelector(
    toastMessageState,
    ({ messages }) => messages
)

export const toastMessageTriggers = createSelector(
    toastMessageState,
    ({ triggers }) => triggers
)