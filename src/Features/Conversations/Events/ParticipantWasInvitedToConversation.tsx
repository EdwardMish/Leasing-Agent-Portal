import * as React from 'react'
import { useSelector } from 'react-redux'

import { conversationsSelectors } from '../../../State'
import { ConversationParticipant } from '../../../Types'
import { ParticipantWasInvitedToConversation as ParticipantWasInvitedToConversationEvent } from '../../../Types/Conversations/Events'

const styles = require('../conversations.module.css')

interface ParticipantWasInvitedToConversationProps {
    conversationId: number;
    event: ParticipantWasInvitedToConversationEvent;
}

export const ParticipantWasInvitedToConversation: React.FC<ParticipantWasInvitedToConversationProps> = ({ conversationId, event }) => {
    const {
        invitedUserId,
        metadata
    } = event

    const { userId: invitingUserId } = metadata

    const invitedParticipant: ConversationParticipant = useSelector(conversationsSelectors.conversationParticipant(conversationId, invitedUserId))
    const invitingParticipant: ConversationParticipant = useSelector(conversationsSelectors.conversationParticipant(conversationId, invitingUserId))

    const invited = invitedParticipant?.userName || 'A User'
    const inviting = invitingParticipant?.userName || 'A User'

    return (
        <div className={styles.SystemItem}><p><span>{invited}</span> was added by {inviting}</p></div>
    )
}