export enum UserPermissions {
    None = 'none',
    ViewInvoices = 'viewInvoices',
    ViewUsers = 'viewUsers',
    CreateUpdateUsers = 'createUpdateUsers',
    DisableUsers = 'disableUsers',
    ViewSales = 'viewSales',
    SubmitSales = 'submitSales',
    ViewRequests = 'viewRequests',
    ViewPrivateRequests = 'viewPrivateRequests',
    CreateUpdateRequests = 'createUpdateRequests',
    AdministrateBusiness = 'administrateBusiness', // Business records, address, CoI, Signage, etc. (Compliance). Keeping business info. up to date
    ViewDocuments = 'viewDocuments',
}

export const UserPermissionsDisplayNames = {
    [UserPermissions.ViewInvoices]: 'View Invoices',
    [UserPermissions.ViewUsers]: 'View Users',
    [UserPermissions.CreateUpdateUsers]: 'Create/Update Users',
    [UserPermissions.DisableUsers]: 'Disable Users',
    [UserPermissions.ViewSales]: 'View Sales',
    [UserPermissions.SubmitSales]: 'Submit Sales',
    [UserPermissions.ViewRequests]: 'View Requests',
    [UserPermissions.ViewPrivateRequests]: 'View Private Requests',
    [UserPermissions.CreateUpdateRequests]: 'Create/Update Requests',
    [UserPermissions.AdministrateBusiness]: 'Administrate Business',
    [UserPermissions.ViewDocuments]: 'View Documents',
};
