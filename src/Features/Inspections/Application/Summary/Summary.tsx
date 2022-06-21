import * as React from 'react';
import { Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { Application } from '../../../../State/Inspections';
import { Interaction } from '../../../../State/Inspections/App/Types/Interaction';

import { Header, HeaderLink, LinksPanel, Tabs } from '../../../../Shared/Tabs';
import { Button } from '../../../../Shared/Button';
import { NoContent } from '../../../../Shared/PageElements';

import DeleteInspectionModal from './DeleteInspectionModal';

import SummaryConfirmation from './SummaryConfirmation';
import SummaryItem from './SummaryItem';

import styles = require('../inspections.module.css');

export default (): React.ReactElement => {
    const { url } = useRouteMatch();

    const { propertyId } = useParams<{ propertyId: string }>();

    const { property, activeInspection, inspectionItems, resetInspection, completeInspection } =
        Application.Hooks.useActiveInspectionFromState(parseInt(propertyId, 10));

    const history = useHistory();

    const [showConfirmation, setShowConfirmation] = React.useState<boolean>(false);
    const [showDeleteModal, toggleShowDeleteModal] = React.useState<boolean>(false);

    const confirmCompleteInspection = (): void => {
        setShowConfirmation(true);
    };

    const handleCompleteInspection = (): void => {
        completeInspection();

        history.push('/inspections/completed');
    };

    const closeInspection = (): void => {
        resetInspection();

        history.push('/app/inspections');
    };

    return (
        <div style={{ margin: '1rem 0 0' }}>
            {!!inspectionItems.length ? (
                <Tabs>
                    <Header>
                        <HeaderLink name="Notes" link="notes" />
                        <HeaderLink name="Interactions" link="interactions" />
                    </Header>
                    <LinksPanel>
                        <div className={styles.InspectionSummaryList}>
                            <ul>
                                <Switch>
                                    <Route exact path={`${url}/notes`}>
                                        {Object.values(activeInspection.notes).map(({ id, note, categoryId }) => (
                                            <SummaryItem
                                                key={`summary-item-${id}-${categoryId}`}
                                                id={id}
                                                note={note}
                                                categoryId={categoryId}
                                            />
                                        ))}
                                    </Route>
                                    <Route exact path={`${url}/interactions`}>
                                        {Object.values(activeInspection.interactions).map((interaction: Interaction) => (
                                            <div>
                                                Interaction with{' '}
                                                {property.occupants?.find((o) => o.id === interaction.occupantId)?.name ||
                                                    'Unknown'}{' '}
                                                has {interaction.notes.length} notes and {interaction.photos.length} photos.
                                            </div>
                                        ))}
                                    </Route>
                                    <Redirect from={url} to={`${url}/notes`} />
                                </Switch>
                            </ul>
                            <Button fullWidth text="Complete" withMarginTop callback={confirmCompleteInspection} />
                            <Button fullWidth text="Back To List" inverse withMarginTop callback={closeInspection} />
                            <Button
                                fullWidth
                                text="Delete Draft"
                                warning
                                withMarginTop
                                callback={() => toggleShowDeleteModal(true)}
                            />
                        </div>
                    </LinksPanel>
                </Tabs>
            ) : (
                <>
                    <NoContent message="You have not added anything to this inspecton, so there is nothing to complete at this time." />
                    <Button fullWidth text="Back To List" inverse withMarginTop callback={closeInspection} />
                </>
            )}
            {!!activeInspection && (
                <DeleteInspectionModal
                    activeInspection={activeInspection}
                    showModal={showDeleteModal}
                    closeCallback={() => {
                        toggleShowDeleteModal(false);
                    }}
                    propertyId={propertyId}
                />
            )}
            {showConfirmation && (
                <SummaryConfirmation
                    handleSubmit={handleCompleteInspection}
                    handleCancel={() => setShowConfirmation(!showConfirmation)}
                />
            )}
        </div>
    );
};
