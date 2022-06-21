export interface AlertCreatedEvent {
    AlertId: number;
    Expiration: string;
    Message: string;
    Metadata: {
        EventDate: string;
        UserId: number;
    }
    PropertyId: number;
}
