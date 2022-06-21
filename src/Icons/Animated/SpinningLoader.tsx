import * as React from 'react';

import { Loader } from '../Loader';
import { IconColors } from '../IconColors';

const styles = require('./animated-icons.module.css');

interface SpinningLoaderProps {
    aspect: string;
}

export const SpinningLoader: React.FC<SpinningLoaderProps> = ({ aspect }): React.ReactElement => (
    <div className={styles.SpinningLoader} style={{ width: aspect, height: aspect }}>
        <Loader aspect={aspect} color={IconColors.BrandBlue} />
    </div>
);
