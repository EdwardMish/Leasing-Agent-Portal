import * as React from 'react';
import { Link } from 'react-router-dom';

const buttonStyles = require('../../../Shared/Styles/button.module.css');

interface WelcomeButtonLinkProps {
    display: string;
    link: string;
    inverse?: boolean;
}

const styles = (inverse: boolean) => (inverse
    ? `${buttonStyles.Button} ${buttonStyles.LowProfileButton} ${buttonStyles.InverseButton}`
    : `${buttonStyles.Button} ${buttonStyles.LowProfileButton}`);

const WelcomeButtonLink: React.FC<WelcomeButtonLinkProps> = ({ display, link, inverse = false }) => (
    <Link
        to={link}
        className={styles(inverse)}
        style={{
            width: '100%',
            margin: '1.25rem 0 0',
            padding: '0.75rem 0',
        }}
    >
        <span>{display}</span>
    </Link>
);

export default WelcomeButtonLink;
