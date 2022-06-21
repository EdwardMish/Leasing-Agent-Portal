import { News } from "../../API";

export enum EmergencyMessageActions {
    LOAD_EMERGENCY_NEWS_ITEMS = 'LOAD_EMERGENCY_NEWS_ITEMS',
    SET_EMERGENCY_NEWS_ITEMS = 'SET_EMERGENCY_NEWS_ITEMS',
    ADVANCE_EMERGENCY_NEWS_ITEM = 'ADVANCE_EMERGENCY_NEWS_ITEM'
}

interface LoadEmergencyNewsItemsAction {
    type: typeof EmergencyMessageActions.LOAD_EMERGENCY_NEWS_ITEMS;
}

interface SetEmergencyNewsItemsAction {
    type: typeof EmergencyMessageActions.SET_EMERGENCY_NEWS_ITEMS;
    payload: News.Types.News[];
}

interface AdvanceEmergencyNewsItemsAction {
    type: typeof EmergencyMessageActions.ADVANCE_EMERGENCY_NEWS_ITEM
}

export type EmergencyMessageActionTypes =
    LoadEmergencyNewsItemsAction
    | SetEmergencyNewsItemsAction
    | AdvanceEmergencyNewsItemsAction;