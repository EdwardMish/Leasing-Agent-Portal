import { PropertySelectState } from '../Types';

export const getPropertySelectState = (selected: number, total: number): PropertySelectState => {
    if (selected < 1) {
        return PropertySelectState.NONE;
    }

    if (selected === total) {
        return PropertySelectState.ALL;
    }

    return PropertySelectState.SOME;
};
