import { Occupant, Property } from '../Types';

onmessage = function (e: any) {
    const { data }: {
        data: {
            properties: Property[];
            occupants: Occupant[];
            propertyCookie: string;
            occupantCookie: string;
        }
    } = e;

    const state = { ...data };
    // @ts-ignore
    postMessage(state);
};
