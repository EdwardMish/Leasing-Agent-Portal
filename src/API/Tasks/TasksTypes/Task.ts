import { ComplianceStatus, ComplianceType } from 'API/Compliance';
import TaskPriority from 'State/Tasks/Types/TaskPriority';
import TaskType from 'State/Tasks/Types/TaskType';

export interface Task {
    id: string;
    type: TaskType;
    priority: TaskPriority;
    daysOpen: number;
    data: TaskData;
}

type TaskData = ComplianceItemNeedsApprovedTaskData | RequestStillOpenTaskData | SalesNeedApprovedTaskData;

export interface ComplianceItemNeedsApprovedTaskData {
    complianceType: ComplianceType;
    complianceStatus: ComplianceStatus;
    occupantId: number;
    occupantName: string;
    propertyId: number;
    propertyName: string;
}

export interface RequestStillOpenTaskData {
    requestId: number;
}

export interface SalesNeedApprovedTaskData {
    month: number;
    year: number;
    occupantId: number;
    occupantName: string;
    propertyId: number;
    propertyName: string;
}

export interface SubscribeToAlertsTaskData {
    mobilePhone?: string;
}
