import * as React from 'react'
import { useSelector } from 'react-redux'

import { conversationsSelectors } from '../../../State'
import { ConversationParticipant } from '../../../Types'
import { ParticipantWasRemovedFromConversation as ParticipantWasRemovedFromConversationEvent } from '../../../Types/Conversations/Events'

const styles = require('../conversations.module.css')

interface ParticipantWasRemovedFromConversationProps {
    conversationId: number;
    event: ParticipantWasRemovedFromConversationEvent;
}

export const ParticipantWasRemovedFromConversation: React.FC<ParticipantWasRemovedFromConversationProps> = ({ conversationId, event }) => {
    const {
        removedUserId,
        metadata
    } = event

    const { userId: removerUserId } = metadata

    const removedParticipant: ConversationParticipant = useSelector(conversationsSelectors.conversationParticipant(conversationId, removedUserId))
    const removingParticipant: ConversationParticipant = useSelector(conversationsSelectors.conversationParticipant(conversationId, removerUserId))

    const removed = removedParticipant?.userName || 'A User'
    const remover = removingParticipant?.userName || 'A User'

    return (
        <div className={styles.SystemItem}><p><span>{removed}</span> was removed by {remover}</p></div>
    )
}
