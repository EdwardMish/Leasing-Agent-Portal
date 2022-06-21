import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../Button';

interface Properties {
    routeTo: string;
    fullWidth?: boolean;
    disable?: boolean;
    lowProfile?: boolean;
    reverse?: boolean;
    withMarginTop?: boolean;
    withMarginBottom?: boolean;
    style?: React.CSSProperties;
}

function Back({ routeTo, ...props }: Properties) {
    const history = useHistory();

    return (
        <Button
            {...props}
            text="Back"
            type="button"
            inverse={true}
            callback={() => {
                routeTo ? history.push(routeTo) : history.goBack();
            }}
        />
    );
}

export default Back;
