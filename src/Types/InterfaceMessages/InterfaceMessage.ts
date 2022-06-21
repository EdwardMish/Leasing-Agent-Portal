import { InterfaceMessageTypes } from './InterfaceMessageTypes';

export interface InterfaceMessage {
    message: string;
    messageType: InterfaceMessageTypes;
    secondaryMessage?: string;
}
