import * as React from 'react';

import { ChevronDown, IconColors, SecondaryMenu } from '../../../Icons';

import { FlexWrapper } from '../../FlexWrapper';

import HeaderItem from './HeaderItem';

const styles = require('../tabs.module.css');

interface MobileHeaderProps {
    actions: React.ReactElement[];
    items: React.ReactElement[];
    selected: number;
    selectTab: (tab: number) => void;
    style?: React.CSSProperties;
}

const MobileHeader: React.FC<MobileHeaderProps & Record<number | string, any>> = ({
    actions,
    items,
    selected,
    selectTab,
}) => {
    const [viewList, toggleList] = React.useState<boolean>(false);
    const [viewActions, toggleActions] = React.useState<boolean>(false);
    const [currentTab, setCurrentTab] = React.useState<string | undefined>();

    React.useEffect(() => {
        setCurrentTab(items[selected]?.props?.name);
    }, [items, selected]);

    const handleListToggle = () => {
        toggleActions(false);
        toggleList(!viewList);
    };

    const handleActionsToggle = () => {
        toggleList(false);
        toggleActions(!viewActions);
    };

    return (
        <>
            <FlexWrapper
                align="center"
                justify="start"
                style={{
                    position: 'relative',
                    margin: '0 0 1rem',
                    padding: '0 0 1rem',
                    borderBottom: '1px solid rgb(200, 200, 200)',
                    zIndex: 1,
                }}
            >
                <div onClick={handleListToggle} className={styles.MobileSelectedTab}>
                    <FlexWrapper align="center" justify="between" style={{ height: '1.5rem', cursor: 'pointer' }}>
                        <p style={{ lineHeight: '1.5rem', marginTop: '-3px' }}>{currentTab || '...'}</p>
                        <ChevronDown color={IconColors.BrandBlue} aspect="1.25rem" />
                    </FlexWrapper>
                    {
                        viewList
                        && (
                            <FlexWrapper align="start" justify="start" column className={styles.MobileHeaderItems}>
                                {
                                    items
                                        .filter(item => React.isValidElement(item))
                                        .map((item, index) => {
                                            const {
                                                name,
                                                hideTab,
                                                link,
                                            } = item.props as any;

                                            return (
                                                <HeaderItem
                                                    key={`header-list-item-${name}`}
                                                    // @ts-ignore next-line: ts(2339)
                                                    type={`${item.type?.displayName}`}
                                                    order={index}
                                                    current={selected}
                                                    handler={selectTab}
                                                    name={name}
                                                    hideTab={hideTab}
                                                    link={link}
                                                />
                                            );
                                        })
                                }
                            </FlexWrapper>
                        )
                    }
                </div>
                {
                    !!(actions.length)
                    && (
                        <div
                            onClick={handleActionsToggle}
                            style={{
                                position: 'relative',
                                width: '2rem',
                                height: '2rem',
                                marginLeft: '0.5rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: viewActions ? IconColors.OffWhite : 'white',
                                borderRadius: '4px',
                            }}
                        >
                            <SecondaryMenu color={IconColors.DarkGrey} aspect="1.5rem" />
                            {
                                viewActions
                                && (
                                    <div className={styles.ActionsMenu}>
                                        {
                                            actions
                                                .filter((action) => {
                                                    if (Object.hasOwnProperty.call(action.props, 'shouldhide') && typeof action.props.shouldhide === 'function') {
                                                        return !(action.props.shouldhide());
                                                    }

                                                    return true;
                                                })
                                                .map((action) => (
                                                    <div
                                                        key={`action-list-${action.props.actionid || 'unkown-action'}`}
                                                        style={{
                                                            padding: '0.75rem 1rem',
                                                        }}
                                                    >
                                                        {action}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </FlexWrapper>
        </>
    );
};

export default MobileHeader;
