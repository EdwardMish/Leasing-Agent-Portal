import ContactAPI from 'API/Contact/ContactAPI';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactCard } from '../../../../../Shared/Contact';
import { LoadingContent } from '../../../../../Shared/PageElements';
import { Contacts } from '../../../../../State';
import { mapOccupantContactToContact } from '../../../../../utils/Mappers';

const styles = require('./occupant-contact-list.module.css');

const { Actions, selectors } = Contacts;

type Contact = Contacts.Types.Contact;
type ContactActionTypes = Contacts.ActionTypes;

interface OccupantContactListProps {
    propertyId: number | string;
    occupantId: number | string;
    rootPath: string;
}

export const OccupantContactList: React.FC<OccupantContactListProps> = ({ propertyId, occupantId, rootPath }) => {
    const dispatch = useDispatch();

    const [pending, setPending] = React.useState<boolean>(false);

    const contacts: Contact[] = useSelector(selectors.occupantContacts(occupantId));
    const contactsAreLoaded: boolean = useSelector(selectors.contactsAreLoadedForOccupant(occupantId));

    React.useEffect(() => {
        if (!contactsAreLoaded && !pending) {
            setPending(true);

            ContactAPI.getOccupantContacts(occupantId).then((response) => {
                dispatch({
                    type: Actions.ADD_OCCUPANT_CONTACTS,
                    payload: {
                        occupantId,
                        contacts: response.map((c) => mapOccupantContactToContact(c)),
                    },
                } as ContactActionTypes);

                setPending(false);
            });
        }
    }, [contactsAreLoaded]);

    return (
        <ul className={styles.OccupantContactList}>
            {contactsAreLoaded ? (
                <>
                    {contacts.map((contact: Contact) => (
                        <li key={contact.id}>
                            <div className={styles.OccupantContactListItem}>
                                <ContactCard contact={contact} />
                            </div>
                        </li>
                    ))}
                </>
            ) : (
                <LoadingContent />
            )}
        </ul>
    );
};

