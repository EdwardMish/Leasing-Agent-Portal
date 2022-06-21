import * as React from 'react';

const SubscriptionContext = React.createContext({
    organization: '',
    isLoaded: false,
});

export default SubscriptionContext;
