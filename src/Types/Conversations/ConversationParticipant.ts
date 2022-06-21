export interface ConversationParticipant {
    email: string;
    userId: number;
    userName: string;
    isActive; boolean;
    lastMessageIdRead: number;
    userType: string;
    property: string;
    occupant: string
}
