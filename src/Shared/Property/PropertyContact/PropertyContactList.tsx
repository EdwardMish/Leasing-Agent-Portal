import { PropertyAPI, PropertyTypes } from 'API/Property';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyContactCard } from '../../../Shared/Contact';
import { Contacts } from '../../../State';
import { mapPropertyContactResponseToContact } from '../../../utils/Mappers';
import { LoadingContent } from '../../PageElements';

const styles = require('./property-contact.module.css');

interface PropertyContactListProps {
    propertyId: number | string;
}

const { Actions, selectors } = Contacts;

type Contact = Contacts.Types.Contact;
type ContactActionTypes = Contacts.ActionTypes;

export const PropertyContactList: React.FC<PropertyContactListProps> = ({ propertyId }) => {
    const dispatch = useDispatch();

    const [pending, setPending] = React.useState<boolean>(false);

    const propertyContacts: Contact[] = useSelector(selectors.propertyContacts(propertyId));
    const contactsLoadedForProperty: boolean = useSelector(selectors.contactsAreLoadedForProperty(propertyId));

    React.useEffect(() => {
        if (!contactsLoadedForProperty && !pending) {
            setPending(true);

            PropertyAPI.getContacts(propertyId).then((response: PropertyTypes.PropertyContactResponse[]) => {
                dispatch({
                    type: Actions.ADD_PROPERTY_CONTACTS,
                    payload: {
                        propertyId,
                        contacts: response.map((c) => mapPropertyContactResponseToContact(c)),
                    },
                } as ContactActionTypes);
            });
        }
    }, [contactsLoadedForProperty]);

    return (
        <ul className={styles.PropertyContactList}>
            {contactsLoadedForProperty ? (
                <>
                    {propertyContacts.map((contact: Contact, index) => (
                        <li key={`property-contact-list-${contact.id}-${index}`}>
                            <div className={styles.PropertyContactListItem}>
                                <PropertyContactCard contact={contact} />
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

