import * as React from 'react';

import Header from './Header';

interface Properties {
    children?: React.ReactNode;
}

const ErrorLayout: React.FC<Properties> = ({ children }) => (
    <>
        <Header />
        <div style={{ textAlign: 'center' }}>{children}</div>
    </>
);

export default ErrorLayout;
