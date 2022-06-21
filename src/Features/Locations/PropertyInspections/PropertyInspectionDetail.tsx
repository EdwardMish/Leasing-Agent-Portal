import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { Route, Redirect, Switch, useParams, useRouteMatch } from 'react-router-dom';

import Inspections from '../../../API/Inspections';

import { Actions, ActionTypes, selectors } from '../../../State/Locations';
import { LocationInspection } from '../../../State/Locations/Types/LocationInspection';

import { Header, HeaderLink, LinksPanel, Tabs, Wrapper, Actions as TabActions } from '../../../Shared/Tabs';

import DynamicContent from '../../../Shared/PageElements/DynamicContent';
import Modal from 'Shared/Modal/Modal';
import { IconWithText } from 'Shared/PageElements';
import { Printer } from 'Icons';

import InspectionCategories from './Details/InspectionCategories';
import InspectionInteractions from './Details/InspectionInteractions';
import InspectionList from './Details/InspectionList';
import InspectionNotes from './Details/InspectionNotes';
import InspectionPhotos from './Details/InspectionPhotos';
import InspectionPrint from 'Features/Inspections/Feature/Print';

const PropertyInspectionDetail: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();

    const { url } = useRouteMatch();

    let { inspectionId } = useParams<{ inspectionId: string; propertyId: string }>();

    const inspectionIsLoaded: boolean = useSelector(selectors.inspectionLoaded(inspectionId));
    const inspection: LocationInspection = useSelector(selectors.inspection(inspectionId));

    const [pending, togglePending] = React.useState<boolean>(false);

    const [printView, togglePrintView] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!inspectionIsLoaded && !pending) {
            togglePending(true);

            Inspections.getInspection(inspectionId)
                .then((inspection) => {
                    dispatch({
                        type: Actions.ADD_INSPECTION,
                        payload: inspection,
                    } as ActionTypes);
                })
                .catch(() => {
                    togglePending(false);
                });
        }
    }, [inspectionIsLoaded, pending]);

    return (
        <DynamicContent
            loaded={inspectionIsLoaded}
            noContent={inspectionIsLoaded && !pending && !!!inspection}
            noContentMessage="We were not able to load this inspection."
        >
            {!!inspection && (
                <p
                    style={{
                        margin: '0 0 1rem',
                        fontStyle: 'italic',
                        color: 'rgb(70, 81, 100)',
                    }}
                >{`Completed: ${format(new Date(inspection.completedDate), 'LL/dd/yy')}`}</p>
            )}
            <Tabs>
                <Header>
                    <HeaderLink name="List" link={`${url}/list`} />
                    <HeaderLink name="Categories" link={`${url}/categories`} />
                    <HeaderLink name="Notes" link={`${url}/notes`} />
                    <HeaderLink name="Photos" link={`${url}/photos`} />
                    <HeaderLink name="Interactions" link={`${url}/interactions`} />
                </Header>
                <LinksPanel>
                    <Switch>
                        <Route exact path={`/locations/:propertyId/inspections/:inspectionId/list`}>
                            <InspectionList />
                        </Route>
                        <Route exact path={`/locations/:propertyId/inspections/:inspectionId/categories`}>
                            <InspectionCategories />
                        </Route>
                        <Route exact path={`/locations/:propertyId/inspections/:inspectionId/notes`}>
                            <InspectionNotes />
                        </Route>
                        <Route exact path={`/locations/:propertyId/inspections/:inspectionId/photos`}>
                            <InspectionPhotos />
                        </Route>
                        <Route exact path={`/locations/:propertyId/inspections/:inspectionId/interactions`}>
                            <InspectionInteractions />
                        </Route>
                        <Redirect
                            from={`/locations/:propertyId/inspections/:inspectionId`}
                            to={`/locations/:propertyId/inspections/:inspectionId/list`}
                        />
                    </Switch>
                </LinksPanel>
                <TabActions>
                    <Wrapper actionid="print-on-inspection">
                        <div onClick={() => togglePrintView(true)}>
                            {inspectionIsLoaded && <IconWithText iconOnLeft text="Print" Icon={Printer} />}
                        </div>
                    </Wrapper>
                </TabActions>
            </Tabs>
            {printView && (
                <Modal header="Inspection Detail" callBack={() => togglePrintView(false)}>
                    <InspectionPrint />
                </Modal>
            )}
        </DynamicContent>
    );
};

export default PropertyInspectionDetail;
