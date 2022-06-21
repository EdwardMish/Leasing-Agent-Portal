import { createSelector } from 'reselect'

import { LoadStatus, State } from '../../Types'
import { Category, Request, RequestState, Subcategory } from './Types'

const requestState = ({ requests }: State) => requests

/* Requests */
const requestsSlice = createSelector(
    requestState,
    ({ requests }: RequestState) => requests
)

export const requestsLoadStatus = createSelector(
    requestsSlice,
    (requests) => requests.loadStatus
)

export const requestsAreLoaded = createSelector(
    requestsLoadStatus,
    (loadStatus: LoadStatus) => loadStatus === LoadStatus.LOADED
)

export const requests = createSelector(
    requestsSlice,
    (requests) => Object.values(requests).filter((r: LoadStatus | Request) => typeof r === 'object')
)

export const request = (requestId: string | number) => createSelector(
    requestsSlice,
    (requests) => requests[requestId]
)

export const requestDescription = (requestId: string | number) => createSelector(
    requestsSlice,
    (requests) => !!(requests[requestId]?.description) ? requests[requestId].description : ''
)

export const requestIsLoaded = (requestId: string | number) => createSelector(
    requestsSlice,
    (requests) => requests.hasOwnProperty(requestId)
)

/* Categories */
const categoriesSlice = createSelector(
    requestState,
    ({ categories }: RequestState) => categories
)

export const categoriesLoadStatus = createSelector(
    categoriesSlice,
    (categories) => categories.loadStatus
)

export const categoriesAreLoaded = createSelector(
    categoriesLoadStatus,
    (loadStatus) => loadStatus === LoadStatus.LOADED
)

export const categories = createSelector(
    categoriesSlice,
    ({ loadStatus, ...categories }) => categories
)

export const category = (categoryId: string) => createSelector(
    categoriesSlice,
    ({ loadStatus, ...categories }) => categories[categoryId]
)

export const categoriesList = createSelector(
    categories,
    (categories) => Object.values(categories)
)

export const categoryNames = createSelector(
    categoriesList,
    (categories) => categories.map(_ => _.name)
)

export const subcategories = (categoryId: string) => createSelector(
    category(categoryId),
    (category: Category) => category?.subcategories || []
)

export const subcategory = (categoryId: string, subcategoryId: string) => createSelector(
    subcategories(categoryId),
    (subcategories: Subcategory[] | null) => subcategories?.find((subcategory: Subcategory) => subcategory.id === subcategoryId) || null
)

/* Notes */
const notesSlice = createSelector(
    requestState,
    ({ requestNotes }: RequestState) => requestNotes
)

export const notes = (requestId: number) => createSelector(
    notesSlice,
    (notes) => notes.hasOwnProperty(requestId) ? notes[requestId] : []
)

export const notesLoadedForRequest = (requestId: number) => createSelector(
    notesSlice,
    (notes) => notes.hasOwnProperty(requestId)
)

/* History */
const historySlice = createSelector(
    requestState,
    ({ requestHistory }: RequestState) => requestHistory
)

export const history = (requestId: number) => createSelector(
    historySlice,
    (history) => history.hasOwnProperty(requestId) ? history[requestId] : []
)

export const historyLoadedForRequest = (requestId: number) => createSelector(
    historySlice,
    (history) => history.hasOwnProperty(requestId)
)

/* Pending Attachments */
const pendingAttachmentSlice = createSelector(
    requestState,
    ({ pendingAttachments }: RequestState) => pendingAttachments
)

export const pendingAttachments = (requestId: number) => createSelector(
    pendingAttachmentSlice,
    (pending) => pending.hasOwnProperty(requestId) ? pending[requestId] : []
)

export const hasPendingAttachments = (requestId: number) => createSelector(
    pendingAttachmentSlice,
    (pending) => pending.hasOwnProperty(requestId)
)