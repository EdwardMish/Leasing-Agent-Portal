import * as React from 'react';
import { useSelector } from 'react-redux';

import { Business } from '../../../../API';

import { Welcome } from '../../../../State';

import { IconColors } from '../../../../Icons';

import { PropertyContactCard } from '../../../../Shared/Contact';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';

import WelcomeButtonLink from '../WelcomeButtonLink';
import BusinessContactsSnippet from '../../../../Data/Snippets/BusinessContactsSnippet';

import styles = require('../welcome.module.css');

export const BusinessContactsPage: React.FC<{}> = () => {
    const firstOccupantToSetup: Welcome.Types.Occupant | undefined = useSelector(
        Welcome.selectors.occupantToSetup,
    );

    const [contacts, setContacts] = React.useState<Business.Types.PropertyContact[]>([]);

    React.useEffect(() => {
        if (firstOccupantToSetup) {
            Business.API.getPropertyContacts(firstOccupantToSetup.propertyId).then((contacts) => {
                setContacts(contacts);
            });
        }
    }, [firstOccupantToSetup]);

    return (
        <>
            <h1>Your Business Contacts</h1>
            <p className={styles.WelcomeParagraphBlock}>
                <BusinessContactsSnippet />
            </p>
            <FlexWrapper justify='between' align='start' column>
                {contacts.map((_) => (
                    <div
                        key={`property-contact-${_.contactType.replace(' ', '-')}`}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderBottom: `1px solid ${IconColors.LightGrey}`,
                        }}
                    >
                        <PropertyContactCard contact={_} />
                    </div>
                ))}
            </FlexWrapper>
            <WelcomeButtonLink display='Continue' link='/app/welcome/users' />
        </>
    );
};
