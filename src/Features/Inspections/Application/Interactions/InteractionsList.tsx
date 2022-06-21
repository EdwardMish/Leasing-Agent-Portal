import * as React from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';

import { ChevronRight, IconColors } from '../../../../Icons';
import { Home, Neighbors, Photos } from '../../../../Icons/InspectionNavBar';

import { FlexWrapper } from '../../../../Shared/FlexWrapper';

import useActiveInspectionFromState from '../../../../State/Inspections/App/Hooks/useActiveInspectionFromState';
import { Interaction } from '../../../../State/Inspections/App/Types/Interaction';

import styles = require('../inspections.module.css');

export default (): React.ReactElement => {
    const { url } = useRouteMatch();

    const { propertyId: propertyIdParam } = useParams<{ propertyId: string }>();
    const propertyId: number = parseInt(propertyIdParam, 10);

    const { interactions, property } = useActiveInspectionFromState(propertyId);

    return (
        <>
            {
                interactions.map((interaction: Interaction) => (
                    <Link
                        to={`${url}/${interaction.id}`}
                        key={`{interaction-list-${interaction.id}`}
                    >
                        <FlexWrapper
                            className={styles.InteractionItem}
                            align="center"
                            justify="between"
                        >
                            <div style={{ width: '100%' }}>
                                <FlexWrapper align="center" justify="start">
                                    <Neighbors />
                                    <span>
                                        {
                                            property.occupants?.find((o) => `${o.id}` === `${interaction.occupantId}`)?.name || 'Unknown'
                                        }
                                    </span>
                                </FlexWrapper>
                                <FlexWrapper
                                    align="start"
                                    justify="between"
                                    className={styles.DetailsIcons}
                                >
                                    <FlexWrapper align="center" justify="start" style={{ width: 'calc(50% - .5rem)' }}>
                                        <Home aspect="1rem" color={IconColors.DarkGrey} />
                                        <span>
                                            :
                                            {interaction.notes.length}
                                        </span>
                                    </FlexWrapper>
                                    <FlexWrapper align="center" justify="start" style={{ width: 'calc(50% - .5rem)' }}>
                                        <Photos aspect="1rem" color={IconColors.DarkGrey} />
                                        <span>
                                            :
                                            {interaction.photos.length}
                                        </span>
                                    </FlexWrapper>
                                </FlexWrapper>
                            </div>
                            <div>
                                <ChevronRight aspect="1.5rem" color={IconColors.BrandBlue} />
                            </div>
                        </FlexWrapper>
                    </Link>
                ))
            }
        </>
    );
};
