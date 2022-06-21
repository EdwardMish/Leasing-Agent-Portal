import * as React from 'react'
import { Link } from 'react-router-dom'

import { Components } from '../../../../Shared/Table'

interface CellWrapperProps {
    rowWrapper: 'div' | 'link';
    linkTarget?: string;
    width: string;
    style?: React.CSSProperties;
}

export const CellWrapper: React.FC<CellWrapperProps> = ({
    rowWrapper,
    linkTarget = '',
    children,
    width,
    style = {},
}) => (
    <>{
        rowWrapper === 'link'
            ? <Components.Column style={{ ...style }} width={width}><Link to={linkTarget}>{children}</Link></Components.Column>
            : <Components.Column style={{ ...style }} width={width}>{children}</Components.Column>
    }</>
)