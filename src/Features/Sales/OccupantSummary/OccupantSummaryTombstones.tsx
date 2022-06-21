import * as React from 'react'

const styles = require('./occupant-summary.module.css')

export const OccupantSummaryTombstones: React.FC<{}> = () => (
    <div className={styles.OccupantSummaryTombstones}>
        <div className={styles.OccupantNameTombstone} />
        <div className={styles.PropertyNameTombstone} />
    </div>
)