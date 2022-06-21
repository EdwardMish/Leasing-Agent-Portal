import { Space } from '../../Shared/Types/Space';

type SpaceId = number

export interface SpacesState {
    spaces: Record<SpaceId, Space>;
    spaceOccupants: Record<SpaceId, number[]>;
}