import * as React from 'react'
import { useSelector } from 'react-redux'

import { conversationsSelectors } from '../../../State'
import { ConversationParticipant } from '../../../Types'
import { ParticipantJoinedConversation as ParticipantJoinedConversationEvent } from '../../../Types/Conversations/Events'

const styles = require('../conversations.module.css')

interface ParticipantJoinedConversationProps {
    conversationId: number;
    event: ParticipantJoinedConversationEvent;
}

export const ParticipantJoinedConversation: React.FC<ParticipantJoinedConversationProps> = ({ conversationId, event }) => {
    const {
        userId
    } = event

    const user: ConversationParticipant = useSelector(conversationsSelectors.conversationParticipant(conversationId, userId))

    const userName = user?.userName || 'A User'

    return (
        <div className={styles.SystemItem}><p><span>{userName}</span> joined the conversation.</p></div>
    )
}