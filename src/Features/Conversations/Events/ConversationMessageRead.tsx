import * as React from 'react'

import { ConversationMessageRead as ConversationMessageReadEvent } from '../../../Types/Conversations/Events'

interface ConversationMessageReadProps {
    event: ConversationMessageReadEvent;
}

export const ConversationMessageRead: React.FC<ConversationMessageReadProps> = () => null