import { PropertyAPI } from 'API/Property';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route as ReactRoute, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import * as Yup from 'yup';
import { Button } from '../../../Shared/Button';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { Text } from '../../../Shared/Forms/Input';
import { LoadingContent } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { PropertyContactList } from '../../../Shared/Property/PropertyContact';
import { TabLink } from '../../../Shared/TabLink';
import { CurrentUserState, globalMessageActionCreators } from '../../../State';
import { CurrentUser } from '../../../State/CurrentUser/Types';
import { Hooks, selectors } from '../../../State/Locations';
import { Property, PropertyOccupant, Space } from '../../../State/Shared/Types';
import { Route } from '../../../Types';
import { getRootPath } from '../../../utils';
import { userIsOwnerOperatorAdmin } from '../../../utils/Users';
import { DashCommIDPlansPanel } from '../../../Vendors/IDPlans';
import PropertyInspectionDetail from '../PropertyInspections/PropertyInspectionDetail';
import PropertyInspections from '../PropertyInspections/PropertyInspections';
import LinkList from './LinkList';

const modalParagraphStyles: React.CSSProperties = {
    margin: '0 0 1rem',
    lineHeight: '1.6',
};

const PropertyDetail: React.FC = (): React.ReactElement => {
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();

    const { propertyId } = useParams<{ propertyId: string }>();
    const currentUser: CurrentUser = useSelector(CurrentUserState.selectors.currentUser);

    Hooks.useLocationsSpacesFromState(propertyId);

    const property: Property = useSelector(selectors.property(propertyId));
    const propertiesAreLoaded: boolean = useSelector(selectors.propertiesAreLoaded);
    const propertyOccupants: PropertyOccupant[] = useSelector(selectors.propertyOccupants(propertyId));

    const propertySpaces: Space[] = useSelector(selectors.sortedSpacesForProperty(propertyId));
    const spacesAreLoadedForProperty: boolean = useSelector(selectors.spacesLoadedForProperty(propertyId));

    const [showArchiveModal, toggleArchiveModal] = React.useState<boolean>(false);

    const target = getRootPath(match.path, '/locations');

    const routes: Route[] = [{ target, display: 'Locations' }];

    const breadCrumbs = {
        current: property?.name || '...',
        routes,
    };

    const tabLocations = {
        0: 'neighbors',
        1: 'spaces',
        2: 'contacts',
        3: 'details',
        4: 'inspections',
    };

    const tabs = [
        { name: 'Neighbors', link: `${match.url}/${tabLocations[0]}` },
        { name: 'Spaces', link: `${match.url}/${tabLocations[1]}` },
        { name: 'Contacts', link: `${match.url}/${tabLocations[2]}` },
        { name: 'Details', link: `${match.url}/${tabLocations[3]}` },
        { name: 'Inspections', link: `${match.url}/${tabLocations[4]}` },
    ];

    const archiveProperty = () => {
        if (userIsOwnerOperatorAdmin(currentUser) === false) return;

        PropertyAPI.archiveProperty(property.id)
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage('Successfully Archived Property'));
                history.goBack();
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to archive property at this time'));
            });
    };

    return (
        <PageWrapper pageTitle={`Locations | ${property?.name || ''}`} breadCrumbs={breadCrumbs}>
            {propertiesAreLoaded && !!property ? (
                <>
                    <h1>{property.name}</h1>
                    <TabLink tabs={tabs} />
                    <Switch>
                        <ReactRoute path={`${match.url}/${tabLocations[0]}`}>
                            <LinkList propertyId={property.id} occupants={propertyOccupants} rootPath={target} />
                        </ReactRoute>
                        <ReactRoute path={`${match.url}/${tabLocations[1]}`}>
                            {spacesAreLoadedForProperty ? (
                                <LinkList propertyId={property.id} spaces={propertySpaces} rootPath={target} />
                            ) : (
                                <LoadingContent />
                            )}
                        </ReactRoute>
                        <ReactRoute path={`${match.url}/${tabLocations[2]}`}>
                            <PropertyContactList propertyId={property.id} />
                        </ReactRoute>
                        <ReactRoute path={`${match.url}/${tabLocations[3]}`}>
                            <DashCommIDPlansPanel propertyId={property.id} />
                        </ReactRoute>
                        <ReactRoute path={`${match.url}/${tabLocations[4]}/:inspectionId`}>
                            <PropertyInspectionDetail />
                        </ReactRoute>
                        <ReactRoute path={`${match.url}/${tabLocations[4]}`}>
                            <PropertyInspections propertyId={property.id} />
                        </ReactRoute>
                        <Redirect from="/" to={`${match.url}/${tabLocations[0]}`} />
                    </Switch>
                    {userIsOwnerOperatorAdmin(currentUser) && (
                        <Button
                            text="Archive"
                            callback={() => toggleArchiveModal(true)}
                            style={{
                                backgroundColor: 'var(--color-WarningRed)',
                                borderColor: 'var(--color-WarningRed)',
                            }}
                        />
                    )}
                    {showArchiveModal && (
                        <Formik
                            initialValues={{
                                propertyName: '',
                            }}
                            onSubmit={() => {
                                archiveProperty();
                            }}
                            validationSchema={Yup.object({
                                propertyName: Yup.string()
                                    .required('Required')
                                    .equals([property.name], 'Property name does not match'),
                            })}
                        >
                            {({ handleSubmit }) => (
                                <Form>
                                    <ModalWithAction
                                        header={`Archive: ${property.name}`}
                                        actionText="Archive"
                                        actionCallback={handleSubmit}
                                        cancelCallback={() => toggleArchiveModal(false)}
                                    >
                                        <FlexWrapper align="center" justify="center" wrap={true} column={true}>
                                            <div style={{ padding: '1rem', width: '100%' }}>
                                                <p style={modalParagraphStyles}>Archiving a property cannot be undone.</p>
                                                <p style={modalParagraphStyles}>
                                                    Are you sure you want to archive this property?
                                                </p>
                                                <Text
                                                    fullWidth
                                                    id="propertyName"
                                                    name="propertyName"
                                                    label="Enter the property name to archive this property:"
                                                    placeholder="Property name..."
                                                />
                                            </div>
                                        </FlexWrapper>
                                    </ModalWithAction>
                                </Form>
                            )}
                        </Formik>
                    )}
                </>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
};

export default PropertyDetail;

