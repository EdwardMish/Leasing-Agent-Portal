import * as React from 'react'
import { Button } from '../../../../../Shared/Button'
import { Requests } from '../../../../../State'

interface ConfirmationModalViewProps {
    callback: () => void;
    cancelCallback: () => void;
    user: Requests.Types.RequestUserSummary | null;
}

export const ConfirmationModalView: React.FC<ConfirmationModalViewProps> = ({ callback, cancelCallback, user }) => (
    <>
        <p style={{ lineHeight: '1.5rem' }}><b>This Request is currently assigned to another user:</b></p>
        <p style={{ lineHeight: '1.5rem' }}>{user?.name || 'Unknown User'}</p>
        <p style={{ lineHeight: '1.5rem' }}>{user?.email || ''}</p>
        <p style={{ lineHeight: '1.5rem', marginTop: '0.5rem' }}><b>Would you like to start working this Request?</b></p>
        <Button
            callback={callback}
            text='Confirm'
            fullWidth
            lowProfile
            withMarginTop
        />
        <Button
            callback={cancelCallback}
            text='Cancel'
            fullWidth
            inverse
            lowProfile
            withMarginTop
        />
    </>
)