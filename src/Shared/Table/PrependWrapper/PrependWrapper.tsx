import * as React from 'react';

import { FlexWrapper } from '../../FlexWrapper';

import styles = require('./prepend-wrapper.module.css')
import tableStyles = require('../TableRow/table-row.module.css')

interface Properties {
    data: string;
    display: string;
    style?: Record<string, string>;
}

const PrependWrapper: React.FC<Properties> = ({
    data,
    display,
    style,
}) => (
    <FlexWrapper align='center' justify='start' className={styles.PrependWrapper} style={style}>
        <p className={`${tableStyles.TableRowText} ${tableStyles.TableRowPrepend}`}>{`${display}: `}</p>
        <p className={tableStyles.TableRowText}>{data}</p>
    </FlexWrapper>
)

export default PrependWrapper;