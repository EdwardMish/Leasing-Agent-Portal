import * as React from 'react';
import { Link } from 'react-router-dom';

import { Route } from '../../Types';

import { Add } from '../../Icons';
import IconWithText from './IconWithText';

const styles = require('./secondary-title.module.css');

interface SecondaryTitleWithLinkProps {
    route: Route;
    title: string;
    withMargin?: boolean;
}

export const SecondaryTitleWithLink: React.FC<SecondaryTitleWithLinkProps> = ({ route, title, withMargin = true }) => (
    <div
        className={`${styles.SecondaryTitle} ${
            withMargin ? styles.SecondaryTitleWithMargin : styles.SecondaryTitleNoMargin
        }`}
    >
        <h2>{title}</h2>
        <Link to={route.target}>
            <IconWithText text={route.display} Icon={Add} />
        </Link>
    </div>
);

