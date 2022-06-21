import { StateRecord } from '../../../Types/State/StateRecord';

import { PropertyWithOccupants } from '../../Shared/Types/PropertyWithOccupants';
import { Space } from '../../Shared/Types/Space';

import { LocationInspection } from './LocationInspection';
import { LocationInspectionSummary } from './LocationInspectionSummary';
import { OccupantDetail } from './OccupantDetail';

type PropertyId = number;
type SpaceId = number;

export interface LocationsState {
    inspections: Record<number, LocationInspection>;
    inspectionSummaries: Record<PropertyId, LocationInspectionSummary[]>;
    occupants: Record<number, OccupantDetail>;
    properties: StateRecord<PropertyWithOccupants>;
    spaces: Record<PropertyId, StateRecord<Space>>;
    spaceOccupants: Record<SpaceId, OccupantDetail[]>;
}
