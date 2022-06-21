import * as React from 'react';
import { ChevronDown, ChevronUp } from '../../Icons';

const styles = require('./expandable-section.module.css');

interface ExpandableSectionProperties {
    title: React.ReactNode
}

export const ExpandableSection: React.FC<ExpandableSectionProperties> = ({ title, children }) => {
    const [active, setActive] = React.useState<boolean>(false);

    return (
        <>
            <div
                className={`${styles.ExpandableSection}`}
                aria-expanded={active}
                onClick={() => setActive(!active)}
            >
                {title}
                <div className={styles.Expanded}>{active ? <ChevronUp /> : <ChevronDown />}</div>
            </div>
            {
                active
                && (
                    <div className={styles.ExpandableSectionChildren}>
                        {children}
                    </div>
                )
            }
        </>
    );
};
