import * as React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { ChevronRight } from '../../Icons';

const styles = require('./horizontal-select-list.module.css');

interface HorizontalSelectListProps {
    display: string;
    options: { value: number, display: number | string }[];
    handler: (value: number) => void;
}

export const HorizontalSelectList: React.FC<HorizontalSelectListProps> = ({ display, handler, options }) => {
    const [showOptions, toggleOptions] = React.useState<boolean>(false);

    const handleList = (e: React.FormEvent<HTMLDivElement>) => {
        toggleOptions(true);
    };

    const handleClick = (value: number) => {
        handler(value);

        toggleOptions(false);
    };

    return (
        <div className={styles.HorizontalSelectList}>
            <div onClick={handleList} className={styles.HorizontalSelectListDisplay}>
                <p className={styles.HorizontalSelectListCurrent}>{display}</p>
                <div className={styles.HorizontalSelectListToggle}>
                    <ChevronRight />
                </div>
            </div>
            {
                showOptions
                && (
                    <OutsideClickHandler onOutsideClick={() => { toggleOptions(false); }}>
                        <div className={styles.HorizontalSelectListOptions}>
                            {
                                options.map(({ value, display }: { value: number, display: number | string }) => <p key={`horizontal-select-list-${value}`} onClick={() => handleClick(value)}>{display}</p>)
                            }
                        </div>
                    </OutsideClickHandler>
                )
            }
        </div>
    );
};
