import { TabStatesTab } from './TabStatesTab';
import { TabStatesTabAction } from './TabStatesTabAction';

export interface TabStatesTabWithAction extends TabStatesTab {
    action?: TabStatesTabAction;
}
