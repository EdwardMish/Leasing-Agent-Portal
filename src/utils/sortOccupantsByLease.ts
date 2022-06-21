import { Occupant } from '../State/Occupants/Types/Occupant';

export default (o: Occupant[]): {
    0: Occupant[],
    1: Occupant[],
    2: Occupant[],
} => o.reduce((set, occupant: Occupant) => {
    if (new Date(occupant.leaseEnd) < new Date(Date.now())) {
        return {
            ...set,
            1: [...set[1], occupant],
        };
    }

    if (new Date(occupant.leaseStart) > new Date(Date.now())) {
        return {
            ...set,
            2: [...set[2], occupant],
        };
    }

    return {
        ...set,
        0: [...set[0], occupant],
    };
}, { 0: [], 1: [], 2: [] });
