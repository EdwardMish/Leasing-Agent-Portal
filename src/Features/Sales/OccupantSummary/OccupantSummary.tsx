import * as React from 'react'

const styles = require('./occupant-summary.module.css')

interface OccupantSummaryProps {
    headerTags?: Array<'h1' | 'h2' | 'h3' | 'h4'>
    noMarginTop?: boolean;
    noMarginBottom?: boolean;
    occupantName?: string;
    propertyName?: string;
}

export const OccupantSummary: React.FC<OccupantSummaryProps> = ({
    headerTags,
    noMarginTop = false,
    noMarginBottom = false,
    occupantName,
    propertyName,
}) => {
    const MainTag = !!headerTags && headerTags[0] ? headerTags[0] : 'h2'
    const SecondaryTag = !!headerTags && headerTags[1] ? headerTags[1] : 'h3'

    return (
        <>
            <MainTag className={`${styles.OccupantName} ${noMarginTop ? styles.NoMarginTop : ''}`}>{occupantName}</MainTag>
            <SecondaryTag className={`${styles.PropertyName} ${noMarginBottom ? styles.NoMarginBottom : ''}`}>{propertyName}</SecondaryTag>
        </>
    )
}