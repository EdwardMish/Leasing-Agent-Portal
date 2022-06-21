import { Route } from '../../../Types';

export interface ToastMessage {
    id: number;
    title: string;
    message: string;
    link?: Route;
    action?: {
        display: string;
        func: () => void;
    }
}