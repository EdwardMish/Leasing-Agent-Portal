import * as React from 'react'

import { ChevronDown, ChevronUp, IconColors } from '../../../../Icons'

import { FlexWrapper } from '../../../../Shared/FlexWrapper'

const styles = require('./request-summary.module.css')

interface RequestSummaryToggleProps {
    requestId: number;
    showSummaryForId: number | null;
    toggleSummary: (requestId: number) => void;
}

export const RequestSummaryToggle: React.FC<RequestSummaryToggleProps> = ({
    requestId,
    showSummaryForId,
    toggleSummary,
}) => (
    <div className={styles.PrependRow} onClick={() => toggleSummary(requestId)}>
        <p className={styles.Prepend}>Request Summary</p>
        <FlexWrapper
            align='center'
            justify='center'
            style={{
                width: '2rem',
                height: '2rem',
                padding: '0.1375rem',
                cursor: 'pointer',
            }}
        >
            {
                showSummaryForId && showSummaryForId === requestId
                    ? <ChevronUp color={IconColors.BrandBlue} aspect='1.5rem' />
                    : <ChevronDown color={IconColors.BrandBlue} aspect='1.5rem' />
            }
        </FlexWrapper>
    </div>
)