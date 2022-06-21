import * as React from 'react';

import { AnimatedIcons } from '../../../../Icons';

export default ({ photo }): React.ReactElement => {
    const { file } = photo;

    const objectUrl: string | undefined = file ? URL.createObjectURL(file) : undefined;

    React.useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl)
            }
        };
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '23%',
            marginRight: '2%',
        }}>
            <div style={{
                position: 'absolute',
                left: 'calc(50% - 0.75rem)',
                top: 'calc(50% - 0.75rem)',
                zIndex: 1,
            }}>
                <AnimatedIcons.SpinningLoader aspect='1.5rem' />
            </div>
            <img
                src={objectUrl}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '4.75rem',
                    opacity: '25%',
                    zIndex: 0,
                    objectFit: 'cover',
                    objectPosition: '50% 50%',
                }}
            />
        </div >
    )
}