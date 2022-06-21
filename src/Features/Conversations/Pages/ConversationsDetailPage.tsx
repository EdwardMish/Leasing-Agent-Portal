import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { ArrowLeftCircle } from '../../../Icons'
import { ConversationDetail } from '../ConversationDetail'

const styles = require('./conversation-pages.module.css')

export const ConversationsDetailPage: React.FC<{}> = () => {
    const history = useHistory()
    let { conversationId } = useParams<{ conversationId: string }>()

    const handleReturn = () => {
        history.push('/conversations')
    }

    return (
        <div className={styles.ConversationDetailPage}>
            <div onClick={handleReturn} className={styles.ConversationDetailPageHeader}>
                <ArrowLeftCircle />
                <p>Back to list</p>
            </div>
            <ConversationDetail conversationId={parseInt(conversationId)} />
        </div>
    )
}