import * as React from 'react'
import { useSelector } from 'react-redux'

import { conversationsSelectors } from '../../../State'
import { ConversationParticipant } from '../../../Types'
import { ParticipantLeftConversation as ParticipantLeftConversationEvent } from '../../../Types/Conversations/Events'

const styles = require('../conversations.module.css')

interface ParticipantLeftConversationProps {
    conversationId: number;
    event: ParticipantLeftConversationEvent;
}

export const ParticipantLeftConversation: React.FC<ParticipantLeftConversationProps> = ({ conversationId, event }) => {
    const {
        userId
    } = event

    const user: ConversationParticipant = useSelector(conversationsSelectors.conversationParticipant(conversationId, userId))

    const userName = user?.userName || 'A User'

    return (
        <div className={styles.SystemItem}><p><span>{userName}</span> left the conversation.</p></div>
    )
}