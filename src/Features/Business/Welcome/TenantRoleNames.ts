import { ApplicationFeatures } from '../../ApplicationFeatures';

// TODO: Will work to start welcome flow, need to remove
export enum TenantRoleNames {
    Basic = 'Basic',
    Sales = 'Sales',
    Accounting = 'Accounting',
    Admin = 'Administrator',
}

export const roleNameByFeature = (featureName: ApplicationFeatures): TenantRoleNames => ({
    [ApplicationFeatures.Sales]: TenantRoleNames.Sales,
    [ApplicationFeatures.Invoices]: TenantRoleNames.Accounting,
    [ApplicationFeatures.Requests]: TenantRoleNames.Basic,
}[featureName]);
