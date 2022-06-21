import * as React from 'react';

import { IconColors } from '../../Icons';
import { IconProps } from '../../Icons/IconProps';

import styles from './icon-with-text.module.css';

interface IconWithTextWithCallbackProps {
  text: string;
  Icon: React.FC<IconProps>;
  iconOnLeft?: boolean;
  color?: IconColors;
  callBack?: () => void;
}

export const IconWithTextWithCallback: React.FC<IconWithTextWithCallbackProps> =
  ({
    text,
    Icon,
    iconOnLeft = false,
    color = IconColors.BrandBlue,
    callBack,
  }) => {
    const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (callBack) callBack();
    };

    return (
      <div className={styles.IconWithText} onClick={handleClick}>
        {iconOnLeft ? (
          <>
            <Icon color={color} aspect="1.2rem" />
            <p className={styles.IconOnLeft} style={{ color }}>
              {text}
            </p>
          </>
        ) : (
          <>
            <p className={styles.IconOnRight} style={{ color }}>
              {text}
            </p>
            <Icon color={color} aspect="1.2rem" />
          </>
        )}
      </div>
    );
  };
