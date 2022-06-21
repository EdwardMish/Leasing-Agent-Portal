import { LoadStatus } from '../../../Types';
import { LeasingApplication } from './LeasingApplication';

export interface LeasingState {
    application?: LeasingApplication;
    loadStatus: LoadStatus;
    pause: boolean;
}
