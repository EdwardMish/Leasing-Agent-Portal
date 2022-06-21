/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { File as FileIcon, IconColors } from 'Icons';
import React from 'react';
import styles from './style.css';
import { isImageType } from 'utils';

const Thumbnail = ({ id, name, src, alt, style = {}, isImage = isImageType(name) }) => {
    return isImage ? (
        <img id={id} src={src} alt={alt} className={styles.ThumbnailAttachment} style={style} />
    ) : (
        <div className={styles.ThumbnailGeneralDocument}>
            <FileIcon aspect="4rem" color={IconColors.BrandBlue} style={{ alignContent: 'center' }} />
            <p className={styles.ThumbnailGeneralDocument} style={{ color: IconColors.BrandBlue }}>
                {name}
            </p>
        </div>
    );
};

export default Thumbnail;
