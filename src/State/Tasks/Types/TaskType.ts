enum TaskType {
    Unknown = 'unknown',
    RequestStillOpen = 'requestStillOpen',
    SalesNeedApproved = 'salesNeedApproved',
    CertificateOfInsuranceNeedsApproved = 'certificateOfInsuranceNeedsApproved',
    SignageNeedsApproved = 'signageNeedsApproved',
    PlansNeedsApproved = 'plansNeedsApproved',
    PermitsNeedsApproved = 'permitsNeedsApproved',
    SubscribeToAlerts = 'subscribeToAlerts',
    CompleteLeasingApplication = 'completeLeasingApplication',
}

export default TaskType;
