import { Inspection } from '../../Types/Inspection';

type InspectionId = number | string;

export type InspectionsFeatureState = Record<InspectionId, Inspection>;
