import * as React from 'react';

import Header from './Header';

interface IsolatedLayoutProps {
    LeftHeaderComponent?: React.ReactElement;
    RightHeaderComponent?: React.ReactElement;
}

const IsolatedLayout: React.FC<IsolatedLayoutProps> = ({ children, LeftHeaderComponent, RightHeaderComponent }) => (
    <>
        <Header LeftComponent={LeftHeaderComponent} RightComponent={RightHeaderComponent} />
        {children}
    </>
);

export default IsolatedLayout;
