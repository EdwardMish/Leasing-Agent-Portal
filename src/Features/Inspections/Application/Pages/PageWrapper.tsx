import * as React from 'react';
import { useParams } from 'react-router-dom';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import useActiveInspectionFromState from '../../../../State/Inspections/App/Hooks/useActiveInspectionFromState';
import { Interaction, Occupant } from '../../../../State/Inspections/App/Types';
import NavBar from '../NavBar';
import PropertyDisplay from '../PropertyDisplay';

import styles = require('../inspections.module.css');

interface Properties {
    headerAction?: React.ReactNode | null;
    children: React.ReactNode | null;
}

export default ({ headerAction, children }: Properties): React.ReactElement => {

    const { propertyId: propertyIdParam, interactionId: interactionIdParam } = useParams<{ propertyId: string, interactionId?: string }>();
    const propertyId = parseInt(propertyIdParam, 10);

    const { propertiesAreLoaded, property, interactions } = useActiveInspectionFromState(propertyId);

    const currentDate: Date = new Date(Date.now());

    return (
        <div className={styles.InspectionsWrapper}>
            <FlexWrapper align='center' justify='between' style={{ margin: '0 0 0.75rem', width: '100%' }}>
                <PropertyDisplay
                    propertyName={`${property?.propertyName || 'Property Inspection'}`}
                    createdDate={currentDate.toDateString()}
                />
                <div>
                    {headerAction}
                </div>
            </FlexWrapper>
            {
                interactionIdParam
                &&
                propertiesAreLoaded
                &&
                (
                    <div style={{ margin: '0 0 0.75rem' }}>
                        <p>Interaction:</p>
                        <h4 style={{ margin: '0' }}>{
                            property.occupants
                                .find(
                                    (occ: Occupant) => occ.id === interactions.find(
                                        (interaction: Interaction) => interaction.id === parseInt(interactionIdParam, 10))?.occupantId)?.name
                        }</h4>
                    </div>
                )
            }
            {children}
            <NavBar />
        </div>
    );
};
