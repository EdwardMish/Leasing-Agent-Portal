import * as React from 'react';
import { IDPlansFeatureGroup } from '../../Types';

const styles = require('./id-plans-navigation-panel.module.css');

interface IDPlansNavigationPanelProps {
    featureGroup: IDPlansFeatureGroup;
}

export const IDPlansNavigationPanel: React.FC<IDPlansNavigationPanelProps> = ({ featureGroup }) => (
    <div className={styles.Panel} style={{ backgroundColor: featureGroup.color }}>
        <div className={styles.FeatureGroupIcon}>
            <featureGroup.Icon />
        </div>
        <p>{featureGroup.display}</p>
    </div>
);
