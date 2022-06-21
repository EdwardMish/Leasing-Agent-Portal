import * as React from 'react';

import { Route, Redirect, Switch, useParams, useRouteMatch } from 'react-router-dom';

import useInspectionFromState from '../../../State/Inspections/Feature/Hooks/useInspectionFromState';

import { Add, IconColors, Remove, Printer } from '../../../Icons';
import { Wrapper, Actions, Header, HeaderLink, LinksPanel, Tabs } from '../../../Shared/Tabs';

import { IconWithText, LoadingContent } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';

import AddComment from './AddCommentModal';
import DeleteInspection from './DeleteInspectionModal';

import InspectionPropertyBlock from './Details/InspectionPropertyBlock';

import InspectionCategories from './Details/InspectionCategories';
import InspectionComments from './Details/InspectionComments';
import InspectionInteractions from './Details/InspectionInteractions';
import InspectionList from './Details/InspectionList';
import InspectionNotes from './Details/InspectionNotes';
import InspectionPhotos from './Details/InspectionPhotos';
import InspectionDraftLink from './InspectionLink';
import InspectionPrint from './Print';
import Modal from 'Shared/Modal/Modal';

const InspectionDetail: React.FC = (): React.ReactElement => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const { url } = useRouteMatch();

    const { inspection } = useInspectionFromState(inspectionId);

    const [showAddCommentModal, toggleAddCommentModal] = React.useState<boolean>(false);
    const [printView, togglePrintView] = React.useState<boolean>(false);
    const [showDeleteInspectionModal, toggleDeleteInspectionModal] = React.useState<boolean>(false);
    const breadCrumbs = {
        current: 'Details',
        routes: [{ target: '/inspections', display: 'Inspections' }],
    };

    return (
        <PageWrapper pageTitle="Inspection Details" breadCrumbs={breadCrumbs}>
            {!!inspection ? (
                <>
                    <InspectionPropertyBlock inspection={inspection} />
                    <Tabs>
                        <Header>
                            <HeaderLink name="List" link={`${url}/list`} />
                            <HeaderLink name="Categories" link={`${url}/categories`} />
                            <HeaderLink name="Notes" link={`${url}/notes`} />
                            <HeaderLink name="Photos" link={`${url}/photos`} />
                            <HeaderLink name="Interactions" link={`${url}/interactions`} />
                            <HeaderLink name="Comments" link={`${url}/comments`} />
                        </Header>
                        <LinksPanel>
                            <Switch>
                                <Route exact path="/inspections/details/:inspectionId/list">
                                    <InspectionList />
                                </Route>
                                <Route exact path="/inspections/details/:inspectionId/categories">
                                    <InspectionCategories />
                                </Route>
                                <Route exact path="/inspections/details/:inspectionId/notes">
                                    <InspectionNotes />
                                </Route>
                                <Route exact path="/inspections/details/:inspectionId/photos">
                                    <InspectionPhotos />
                                </Route>
                                <Route exact path="/inspections/details/:inspectionId/interactions">
                                    <InspectionInteractions />
                                </Route>
                                <Route exact path="/inspections/details/:inspectionId/comments">
                                    <InspectionComments />
                                </Route>
                                <Redirect
                                    from="/inspections/details/:inspectionId"
                                    to="/inspections/details/:inspectionId/list"
                                />
                            </Switch>
                        </LinksPanel>
                        <Actions>
                            <Wrapper actionid="comment-on-inspection">
                                <div onClick={() => toggleAddCommentModal(true)}>
                                    <IconWithText iconOnLeft text="Add Comment" Icon={Add} />
                                </div>
                            </Wrapper>
                            <Wrapper actionid="print-on-inspection" shouldhide={() => !inspection.completedDate}>
                                <div onClick={() => togglePrintView(true)}>
                                    <IconWithText iconOnLeft text="Print" Icon={Printer} />
                                </div>
                            </Wrapper>
                            <Wrapper actionid="continue-inspection" shouldhide={() => !!inspection.completedDate}>
                                <InspectionDraftLink propertyId={inspection.propertyId} />
                            </Wrapper>
                            <Wrapper actionid="delete-draft-inspection" shouldhide={() => !!inspection.completedDate}>
                                <div onClick={() => toggleDeleteInspectionModal(true)}>
                                    <IconWithText
                                        iconOnLeft
                                        text="Delete Draft"
                                        Icon={Remove}
                                        color={IconColors.WarningRed}
                                    />
                                </div>
                            </Wrapper>
                        </Actions>
                    </Tabs>
                    <AddComment showModal={showAddCommentModal} closeCallback={() => toggleAddCommentModal(false)} />
                    <DeleteInspection
                        showModal={showDeleteInspectionModal}
                        closeCallback={() => toggleDeleteInspectionModal(false)}
                    />
                    {printView && (
                        <Modal header="Inspection Detail" callBack={() => togglePrintView(false)}>
                            <InspectionPrint />
                        </Modal>
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
};

export default InspectionDetail;

