import * as React from 'react';
import { Link } from 'react-router-dom';

import { Warning } from '../../Icons';

const styles = require('./emergency-alert-create.module.css');

const EmergencyAlertCreateBubble: React.FC = () => (
    <Link to="/communications/alerts/create" className={styles.EmergencyAlertButton}>
        <Warning aspect="1.25rem" />
        <p>Create Emergency Alert</p>
    </Link>
);

export default EmergencyAlertCreateBubble;
