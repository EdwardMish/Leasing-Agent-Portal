import * as React from 'react';
import { Link } from 'react-router-dom';

import styles = require('./table-row.module.css');

interface TableRowProps {
    rowWrapper: 'link' | 'div';
    linkTarget?: string;
}

export const TableRow: React.FC<TableRowProps> = ({
    children,
    rowWrapper,
    linkTarget = '',
}) => (rowWrapper === 'div' ? <div className={styles.TableRow}>{children}</div> : <Link to={linkTarget} className={styles.TableRow}>{children}</Link>);
