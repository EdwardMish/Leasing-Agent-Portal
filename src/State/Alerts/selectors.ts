import { createSelector } from "reselect";

import { State } from "../../Types";
import { AlertsState } from "./Types";

const alertsState = ({ alerts }: State) => alerts;

export const alerts = createSelector(alertsState, ({ alerts }: AlertsState): string[] => alerts);
