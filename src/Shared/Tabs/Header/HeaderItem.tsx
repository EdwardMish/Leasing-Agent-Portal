import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Tab } from '../Types/Tab';

const styles = require('../tabs.module.css');

interface HeaderItemProps extends Tab {
    type: 'HeaderItem' | 'HeaderLink' | string;
    order: number;
    current: number;
    handler: (tab: number) => void;
    link?: string;
}

export const HeaderItem: React.FC<HeaderItemProps> = ({
    type,
    order,
    current,
    handler,
    name,
    hideTab = () => false,
    link,
}) => {
    const { pathname } = useLocation();

    const [isActive, toggleIsActive] = React.useState<boolean>(false);

    const handleClick = () => {
        if (!isActive && type !== 'HeaderLink') handler(order);
    };

    React.useEffect(() => {
        if (type === 'HeaderLink') toggleIsActive(pathname.includes(link || name.toLocaleLowerCase()));

        if (type === 'HeaderItem') toggleIsActive(current === order);
    }, [type, pathname, name]);

    return (
        <>
            {
                type.includes('Header') && !hideTab()
                    ? (
                        <div onClick={handleClick} className={`${styles.HeaderItem} ${isActive ? styles.ActiveTab : styles.InactiveTab}`}>
                            {
                                type === 'HeaderLink' && link && !!(link.length)
                                    ? <Link to={link}>{name}</Link>
                                    : <p>{name}</p>
                            }
                        </div>
                    )
                    : null
            }
        </>
    );
};

export default HeaderItem;
