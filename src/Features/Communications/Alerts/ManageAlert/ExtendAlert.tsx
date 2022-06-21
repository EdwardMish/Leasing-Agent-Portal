import * as React from 'react';
import hoursToMinutes from 'date-fns/hoursToMinutes';

import API from '../../../../API/Alerts';

import { IconColors } from '../../../../Icons';

import { Button } from '../../../../Shared/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';

type Duration = 0 | 1 | 2 | 3 | 5 | 7;

const durationStyle = (duration: number, val: number): React.CSSProperties => ({
    fontSize: '0.9rem',
    fontWeight: 700,
    display: 'block',
    lineHeight: '2rem',
    width: '2rem',
    height: '2rem',
    margin: '0 0.25rem',
    borderRadius: '50%',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: duration === val ? IconColors.BrandBlue : 'transparent',
    color: duration === val ? IconColors.White : 'inherit',
});

const ExtendAlert: React.FC<{ alertId: number; refreshCallback: () => void }> = ({
    alertId,
    refreshCallback,
}): React.ReactElement => {
    const [duration, setDuration] = React.useState<Duration>(1);
    const [message, setMessage] = React.useState<string>('');

    const extendDuration = async () => {
        await API.extendAlert(alertId, hoursToMinutes(duration * 24));

        refreshCallback();

        setDuration(0);

        setMessage(`You've extended the alert by ${duration} days.`);
    };

    return (
        <>
            {!!message.length && (
                <p
                    style={{
                        display: 'block',
                        padding: '1rem',
                        margin: '0 0 1rem',
                        border: `1px solid ${IconColors.SucccessGreen}`,
                        backgroundColor: IconColors.SucccessGreenSecondary,
                        color: IconColors.SucccessGreen,
                        borderRadius: '0.25rem',
                    }}
                >
                    {message}
                </p>
            )}
            <p style={{ margin: '0 0 1rem' }}>
                Extend the alert by a number of days if the emergency alert is still warranted.
            </p>
            <FlexWrapper align="center" justify="between">
                <FlexWrapper align="center" justify="start">
                    <p
                        style={{ ...durationStyle(duration, 1) }}
                        onClick={() => {
                            setDuration(1);
                        }}
                    >
                        1
                    </p>
                    <p
                        style={{ ...durationStyle(duration, 2) }}
                        onClick={() => {
                            setDuration(2);
                        }}
                    >
                        2
                    </p>
                    <p
                        style={{ ...durationStyle(duration, 3) }}
                        onClick={() => {
                            setDuration(3);
                        }}
                    >
                        3
                    </p>
                    <p
                        style={{ ...durationStyle(duration, 5) }}
                        onClick={() => {
                            setDuration(5);
                        }}
                    >
                        5
                    </p>
                    <p
                        style={{ ...durationStyle(duration, 7) }}
                        onClick={() => {
                            setDuration(7);
                        }}
                    >
                        7
                    </p>
                </FlexWrapper>
                <Button text="Extend" callback={extendDuration} disable={duration === 0} />
            </FlexWrapper>
        </>
    );
};

export default ExtendAlert;
