import * as React from 'react';
import { Button, ButtonProps } from '../../Button';

function Submit({ type, ...props }: ButtonProps) {
    return <Button {...props} type="submit" />;
}

export default Submit;
