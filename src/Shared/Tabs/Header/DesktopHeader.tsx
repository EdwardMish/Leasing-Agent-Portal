import * as React from "react";

import { FlexWrapper } from "../../FlexWrapper";

import DesktopHeaderActions from "./DesktopHeaderActions";
import HeaderItem from "./HeaderItem";

interface DesktopHeaderProps {
    actions: React.ReactElement[];
    items: React.ReactElement[];
    selected: number;
    selectTab: (tab: number) => void;
    style?: React.CSSProperties;
}

const DesktopHeader: React.FC<DesktopHeaderProps & Record<number | string, any>> = ({
    actions,
    items,
    selected,
    selectTab,
    style = {},
}) => (
    <FlexWrapper
        align="center"
        justify="between"
        style={{
            ...style,
            position: "relative",
            borderBottom: "1px solid rgb(200, 200, 200)",
            zIndex: 1,
        }}
    >
        <FlexWrapper align="center" justify="start">
            {items
                .filter((item) => React.isValidElement(item))
                .map((item, index) => {
                    const { name, hideTab, link } = item.props as any;

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
                })}
        </FlexWrapper>
        {!!actions.length && <DesktopHeaderActions actions={actions} />}
    </FlexWrapper>
);

export default DesktopHeader;
