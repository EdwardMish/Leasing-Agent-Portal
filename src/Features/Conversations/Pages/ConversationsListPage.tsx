import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { TabStates } from '../../../Shared/TabStates'

import { ConversationList } from '../ConversationList'

export const ConversationsListPage: React.FC<{}> = () => {
    const history = useHistory()

    const [showActive, toggleActiveList] = React.useState<boolean>(true)

    const setCurrentConversation = (conversationId: number) => {
        history.push(`/conversations/${conversationId}`)
    }

    const toggleActive = (value: number) => {
        value === 0 ? toggleActiveList(true) : toggleActiveList(false)
    }

    const tabs = [
        { name: 'Active', callBack: toggleActive},
        { name: 'History', callBack: toggleActive},
    ]

    return (
        <>
            <h1>Conversations</h1>
            <TabStates tabs={tabs} />

            <ConversationList
                setCurrentConversation={setCurrentConversation}
                showActive={showActive}
            />
        </>
    )
}