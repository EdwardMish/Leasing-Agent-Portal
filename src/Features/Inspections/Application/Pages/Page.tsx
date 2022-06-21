import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Inspections, { Types } from '../../../../API/Inspections';
import { InspectionsApp } from '../../../../State';

import PropertyList from '../PropertyList';
import PropertyPage from './PropertyPage';

export default (): React.ReactElement => {
    const dispatch = useDispatch();

    const propertiesArePending: boolean = useSelector(InspectionsApp.selectors.propertiesArePending);
    const propertiesAreLoaded: boolean = useSelector(InspectionsApp.selectors.propertiesAreLoaded);

    React.useEffect(() => {
        if (!propertiesAreLoaded && !propertiesArePending) {
            dispatch({
                type: InspectionsApp.Actions.LOAD_PROPERTIES,
            });

            Inspections.getProperties()
                .then((properties: Types.Property[]) => {
                    dispatch({
                        type: InspectionsApp.Actions.SET_PROPERTIES,
                        payload: properties,
                    });
                });
        }
    }, [propertiesArePending, propertiesAreLoaded]);

    return (
        <Switch>
            <Route path="/app/inspections/:propertyId">
                <PropertyPage />
            </Route>
            <Route path="/app/inspections">
                <PropertyList />
            </Route>
        </Switch>
    );
};
