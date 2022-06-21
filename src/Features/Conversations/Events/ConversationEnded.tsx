import * as React from 'react'
import { format } from 'date-fns'

import { ConversationEnded as ConversationEndedEvent } from '../../../Types/Conversations/Events'

const styles = require('../conversations.module.css')

interface ConversationEndedProps {
    event: ConversationEndedEvent;
}

export const ConversationEnded: React.FC<ConversationEndedProps> = ({ event }) => (
    <div className={styles.SystemItem}><p><b>{`This conversation ended on ${format(new Date(event.metadata.eventDate), 'LL/dd/yy')}.`}</b></p></div>
)