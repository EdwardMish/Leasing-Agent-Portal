import ContactAPI from 'API/Contact/ContactAPI';
import { ContactTypesResponse } from 'API/Contact/ContactTypes/ContactTypesResponse';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { LoadingContent, Title } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { PropertyList } from '../../../Shared/Property/PropertyList';
import { Contacts, globalMessageActionCreators, Locations } from '../../../State';
import { LoadStatus } from '../../../Types';
import { mapContactTypesResponseToContactTypes } from '../../../utils/Mappers/mapContactTypesResponseToContactTypes';
import OccupantDetail from '../OccupantDetail';
import PropertyDetail from '../PropertyDetail/PropertyDetail';
import SpaceDetail from '../SpaceDetail';

const { Actions: ContactActions, selectors: contactSelectors } = Contacts;

export default (): React.ReactElement => {
    const dispatch = useDispatch();

    const { areLoaded, properties } = Locations.Hooks.useLocationsPropertiesFromState();

    const contactTypesLoadStatus: LoadStatus = useSelector(contactSelectors.contactTypesLoadStatus);

    React.useEffect(() => {
        if (contactTypesLoadStatus === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: ContactActions.LOAD_CONTACT_TYPES,
            });

            ContactAPI.getContactTypes()
                .then((contactTypes: ContactTypesResponse[]) => {
                    dispatch({
                        type: ContactActions.SET_CONTACT_TYPES,
                        payload: contactTypes.map((c) => mapContactTypesResponseToContactTypes(c)),
                    } as Contacts.ActionTypes);
                })
                .catch(() => {
                    dispatch(globalMessageActionCreators.addErrorMessage('We were not able to load some information.'));
                });
        }
    }, [contactTypesLoadStatus]);

    const propertyDetailLinkBuilder = (base: string, id: number | string) => `${base}/${id}`;

    const occupantDetailLinkBuilder = (base: string, propertyId: number | string, occupantId: number | string) =>
        `${base}/${propertyId}/occupants/${occupantId}/details`;

    return (
        <Switch>
            <Route path="/locations/:propertyId/occupants/:occupantId">
                <OccupantDetail />
            </Route>
            <Route path="/locations/:propertyId/spaces/:spaceId">
                <SpaceDetail />
            </Route>
            <Route path="/locations/:propertyId">
                <PropertyDetail />
            </Route>
            <Route path="/locations">
                <PageWrapper pageTitle="Locations">
                    <Title title="Locations" />
                    {areLoaded ? (
                        <PropertyList
                            properties={properties}
                            linkBuilder={propertyDetailLinkBuilder}
                            occupantLinkBuilder={occupantDetailLinkBuilder}
                        />
                    ) : (
                        <LoadingContent />
                    )}
                </PageWrapper>
            </Route>
        </Switch>
    );
};

