import { RequestsAPI } from 'API/Requests';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { Requests } from '../../../State';
import { LoadStatus } from '../../../Types';
import { mapCategoriesResponseToCategories } from '../../../utils/Mappers/mapCategoriesResponseToCategories';
import { CreateRequest } from '../Create';
import { RequestDetails } from '../Details';
import { RequestList } from '../List/RequestList';

export const RequestsPage: React.FC<{}> = () => {
    const dispatch = useDispatch();
    let { path } = useRouteMatch();

    const { selectors: requestSelectors } = Requests;

    const categoryLoadStatus: LoadStatus = useSelector(requestSelectors.categoriesLoadStatus);

    React.useEffect(() => {
        if (categoryLoadStatus === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: Requests.Actions.LOAD_CATEGORIES,
            } as Requests.ActionTypes);

            RequestsAPI.getCategories()
                .then((categoriesResponse) => {
                    const categories: Requests.Types.Category[] = mapCategoriesResponseToCategories(categoriesResponse);

                    dispatch({
                        type: Requests.Actions.SET_CATEGORIES,
                        payload: categories,
                    } as Requests.ActionTypes);
                })
                .catch(() => {});
        }
    }, []);

    return (
        <>
            <Switch>
                <Route path={`${path}/details/:requestId`}>
                    <RequestDetails />
                </Route>
                <Route exact path={`${path}/create`}>
                    <CreateRequest />
                </Route>
                <Route path={path}>
                    <PageWrapper pageTitle="Requests">
                        <RequestList />
                    </PageWrapper>
                </Route>
            </Switch>
        </>
    );
};

