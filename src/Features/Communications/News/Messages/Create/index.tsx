import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store, FeatureFlags } from '../../../../../State';

import { PropertyTenantResolution } from '../PropertyTenantResolution';
import { CurrentUserWrapper } from '../../../../../CurrentUser';
import { GlobalMessageWrapper } from '../../../../../GlobalMessages';

export default ReactDOM.render(
    <Provider store={store}>
        <FeatureFlags.Loaders.FeatureFlagsLoader />
        <CurrentUserWrapper />
        <GlobalMessageWrapper />
        <PropertyTenantResolution />
    </Provider>,
    document.getElementById('news-create'),
);
