import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { InteractionItem } from '../../../../State/Inspections/Types/InteractionItem';

import { selectors } from '../../../../State/Inspections/Feature';

import { format } from 'date-fns';

import styles from './print.module.css';

const InspectionInteractions = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const interactions: InteractionItem[] = useSelector(selectors.interactions(inspectionId));

    return (
        <div className={styles.SectionWrapper}>
            <h2>Interactions</h2>

            {interactions?.map((interaction: InteractionItem) => (
                <div key={interaction.id} className={styles.InteractionWrapper}>
                    <p>Neighbor Interaction(s):</p>
                    <h4 className={styles.InteractionName}>{interaction.occupantName}</h4>

                    {interaction.items.map(
                        (list) =>
                            list.note && (
                                <div className={styles.DetailDateWrapper} key={list.id}>
                                    <div className={styles.TextOverflowBox}>
                                        <p>{list.note}</p>
                                    </div>
                                    <div className={styles.DateBox}>
                                        <p>{list.createdDate && format(new Date(list.createdDate), 'LL/dd/yy - hh:mm')}</p>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            ))}
        </div>
    );
};

export default InspectionInteractions;
