export enum EmailTypes {
    Normal = "normal",
    News = "news",
    Requests = "requests",
    SalesSubmittal = "salesSubmittal",
}

export const EmailTypesDisplayNames = {
    [EmailTypes.Normal]: "Standard Notifications",
    [EmailTypes.News]: "Community News",
    [EmailTypes.Requests]: "Support Requests",
    [EmailTypes.SalesSubmittal]: "Sales Submittals",
};
