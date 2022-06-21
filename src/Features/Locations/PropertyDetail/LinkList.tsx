import * as React from 'react';
import { Link } from 'react-router-dom';

import { Occupants } from '../../../State';
import { PropertyOccupant } from '../../../State/Shared/Types/PropertyOccupant';
import { Space } from '../../../State/Shared/Types/Space';

import { PhoneIconRow } from '../../../Shared/PageElements';

import styles = require('./link-list.module.css');

type Occupant = Occupants.Types.Occupant;

interface LinkListProps {
    propertyId: number;
    rootPath: string;
    occupants?: Array<Occupant | PropertyOccupant>;
    spaces?: Space[];
}

const LinkList: React.FC<LinkListProps> = ({
    occupants = [],
    spaces = [],
    propertyId,
    rootPath,
}) => (
    <>
        {
            !!(occupants.length)
            && occupants.map(({
                id,
                name,
                phone = '',
            }: Occupant | PropertyOccupant) => (
                <Link
                    key={`link-list-item-${id}`}
                    to={`${rootPath}/${propertyId}/occupants/${id}`}
                    className={styles.LinkItem}
                >
                    <h3>{name}</h3>
                    <PhoneIconRow color="#0071ce" phone={phone} />
                </Link>
            ))
        }
        {
            !!spaces.length && spaces.map(({ id, name, address }: Space) => (
                <Link
                    key={`link-list-item-${id}`}
                    to={`${rootPath}/${propertyId}/spaces/${id}`}
                    className={styles.LinkItem}
                >
                    <h3>{name}</h3>
                    {!!(address) && !!(address.length) && <p style={{ margin: '0.5rem 0 0' }}>{address}</p>}
                </Link>
            ))
        }
    </>
);

export default LinkList;
