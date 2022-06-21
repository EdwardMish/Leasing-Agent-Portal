import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNotificationPreference, removeNotificationPreference } from '../../../API/User';

import { currentUserId, currentUserNotificationPreferences } from '../../../State/CurrentUser/selectors';
import { addErrorMessage } from '../../../State/GlobalMessages/actionCreators';
import { EmailTypes, EmailTypesDisplayNames } from '../../../State/Shared/Types/EmailTypes';

import { FlexWrapper } from '../../../Shared/FlexWrapper';

interface EmailPreferenceCheckboxProps {
    emailType: EmailTypes;
}

const EmailPreferenceCheckbox: React.FC<EmailPreferenceCheckboxProps> = ({ emailType }) => {
    const dispatch = useDispatch();

    const userId: number = useSelector(currentUserId);
    const preferences: EmailTypes[] = useSelector(currentUserNotificationPreferences);

    const [checked, toggleChecked] = React.useState<boolean>(preferences.includes(emailType));

    React.useEffect(() => {
        if (preferences.includes(emailType)) toggleChecked(true);
        else toggleChecked(false);
    }, [emailType, preferences]);

    const handleChange = () => {
        const action = checked ? removeNotificationPreference : addNotificationPreference;

        action(userId, emailType)
            .then(() => {
                toggleChecked(!checked);
            })
            .catch(() => {
                dispatch(addErrorMessage('Notification change was not successful.'));
            });
    };

    return (
        <FlexWrapper align="center" justify="start" style={{ height: '1.5rem' }}>
            <input checked={checked} id={emailType} name={emailType} type="checkbox" onChange={handleChange} />
            <label
                htmlFor={emailType}
                style={{
                    margin: '0 0 0 0.25rem',
                    position: 'relative',
                    fontSize: '0.875rem',
                }}
            >
                {EmailTypesDisplayNames[emailType]}
            </label>
        </FlexWrapper>
    );
};

export default EmailPreferenceCheckbox;
