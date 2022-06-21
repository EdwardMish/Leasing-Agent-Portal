import * as React from 'react';

import styles from './anchor-link.module.css';

interface KeyProps {
    AnchorLinkText: string;
}

const AnchorLink: React.FC<KeyProps> = ({ AnchorLinkText }) => {
    return <a className={styles.AnchorLinkStyle}>{AnchorLinkText}</a>;
};

export default AnchorLink;
