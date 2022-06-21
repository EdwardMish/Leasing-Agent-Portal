import * as React from 'react'
import { ConfirmationPanel } from './ConfirmationPanel'

interface ConfirmLeavingConversationProps {
    confirm: () => void;
    cancel: () => void;
}

export const ConfirmLeavingConversation: React.FC<ConfirmLeavingConversationProps> = ({
    confirm,
    cancel
}) => (
        <ConfirmationPanel confirm={confirm} cancel={cancel}>
            <h3>You are about to leave this conversation.</h3>
            <p>By leaving this conversation, you will no longer be able to participate in further discussions, though you will be able to access all previous discussions.</p>
            <p><b>Are you sure you want to leave?</b></p>
        </ ConfirmationPanel>
    )
