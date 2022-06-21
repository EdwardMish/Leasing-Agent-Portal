export enum NotificationTypes {
    Normal,
    News,
    Requests
}

export const getNotificationType = (type: string): NotificationTypes | undefined => {
    if (type === 'normal') return NotificationTypes.Normal;
    if (type === 'news') return NotificationTypes.News;
    if (type === 'requests') return NotificationTypes.Requests;

    return undefined;
};
