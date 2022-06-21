import * as React from 'react'

import { ConfirmationPanel } from './ConfirmationPanel'

interface ConfirmClosingConversationProps {
    confirm: () => void;
    cancel: () => void;
}

export const ConfirmClosingConversation: React.FC<ConfirmClosingConversationProps> = ({
    confirm,
    cancel
}) => (
        <ConfirmationPanel confirm={confirm} cancel={cancel}>
            <h3>You are about to close this conversation.</h3>
            <p>By closing this conversation, all participants will no longer have the ability to send messages, though all participants will be able to access all previous messages.</p>
            <p><b>Are you sure you want to close the conversation?</b></p>
        </ ConfirmationPanel>
    )
