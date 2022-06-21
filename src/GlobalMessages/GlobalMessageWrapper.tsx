import * as React from 'react';
import { useSelector } from 'react-redux';

import { GlobalMessage as GlobalMessageType } from '../Types';
import { globalMessageSelectors } from '../State';

import { GlobalMessage } from './GlobalMessage';
import { FlexWrapper } from '../Shared/FlexWrapper';

export const GlobalMessageWrapper: React.FC<{}> = () => {
    const globalMessageList = useSelector(globalMessageSelectors.globalMessageList);

    return (
        <FlexWrapper
            align="center"
            justify="center"
            column
            style={{
                position: 'fixed',
                top: '5rem',
                width: '100%',
                zIndex: 100,
            }}
        >
            { globalMessageList.map((globalMessage: GlobalMessageType) => <GlobalMessage key={globalMessage.id} globalMessage={globalMessage} />)}
        </FlexWrapper>
    );
};
