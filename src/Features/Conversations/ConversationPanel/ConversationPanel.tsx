import * as React from 'react'

import { ArrowLeftCircle } from '../../../Icons'
import { ConversationDetail } from '../ConversationDetail'
import { ConversationList } from '../ConversationList'

const styles = require('../conversations.module.css')

export const ConversationPanel: React.FC<{}> = () => {
    const [showDetails, toggleDetails] = React.useState<boolean>(false)
    const [currentConversation, setCurrentConversation] = React.useState<number>(0)
    const [showActive, toggleShowActive] = React.useState<boolean>(true)

    const handleCurrentConversation = (conversationId: number) => {
        toggleDetails(true)
        setCurrentConversation(conversationId)
    }

    return (
        <>
            {
                showDetails
                    ? <>
                        <div onClick={() => { toggleDetails(false) }} className={styles.SelectAnother}>
                            <ArrowLeftCircle />
                            <p>Back to list</p>
                        </div>
                        <ConversationDetail conversationId={currentConversation} />
                    </>
                    : <>
                        <div className={styles.ConversationListHeader}>
                            <p className={showActive ? styles.Selected : styles.NotSelected} onClick={() => { toggleShowActive(true) }}>Active</p>
                            <p className={showActive ? styles.NotSelected : styles.Selected} onClick={() => { toggleShowActive(false) }}>History</p>
                        </div>
                        <ConversationList
                            setCurrentConversation={handleCurrentConversation}
                            showActive={showActive}
                        />
                    </>
            }
        </>
    )
}