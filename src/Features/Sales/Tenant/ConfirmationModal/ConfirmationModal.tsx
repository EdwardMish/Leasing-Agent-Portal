import * as React from 'react';

import { formatCurrency, formatCurrencyInput, months } from '../../../../utils';
import { Button } from '../../../../Shared/Button';
import { Inputs } from '../../../../Shared/FormFields';
import { ButtonRow } from '../../../../Shared/ButtonRow';

const styles = require('./confirmation-modal.module.css');

interface ConfirmationModalProps {
    occupantId: number;
    amount: string;
    confirm: () => void;
    cancel: () => void;
    year: number;
    resetConfirm: boolean;
    month?: number;
    comment?: string;
    commentHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    requireCommentForLowSales?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    amount,
    month,
    year,
    confirm,
    cancel,
    resetConfirm,
    comment,
    commentHandler,
    requireCommentForLowSales = false,
}) => {
    const formattedSales: number = formatCurrencyInput(amount);

    let requireComment = requireCommentForLowSales && !!commentHandler && formattedSales <= 10000; // $100.00 in cents

    return (
        <div className={styles.ConfirmationModal}>
            <div className={styles.ConfirmationModalContent}>
                <h2>{`${month ? months[month] + ', ' : ''} ${year}`}</h2>
                <p className={styles.CallOut}>{formatCurrency(formattedSales, 0.01)}</p>
                {requireComment && !!commentHandler && (
                    <Inputs.TextArea
                        id="tenant-resubmit-comment"
                        name="The sales amount you provided seems low.  Please provide a reason for this amount of sales."
                        value={comment || ''}
                        handler={commentHandler}
                        required
                        formRow
                    />
                )}
                <ButtonRow>
                    <Button callback={cancel} text="Cancel" inverse />
                    <Button callback={confirm} text="Confirm" reset={resetConfirm} disable={!comment && requireComment} />
                </ButtonRow>
            </div>
        </div>
    );
};
