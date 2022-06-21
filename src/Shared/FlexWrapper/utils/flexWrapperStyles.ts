import { AlignItemsOptions } from "../Types/AlignItemsOptions";
import { JustifyContentOptions } from "../Types/JustifyContentOptions";

import justifyContent from "./justifyContent";
import alignItems from "./alignItems";

const flexWrapperStyles = ({
    justify,
    align,
    column,
    wrap,
}: {
    justify: JustifyContentOptions;
    align: AlignItemsOptions;
    column?: boolean;
    wrap?: boolean;
}): React.CSSProperties => ({
    display: "flex",
    justifyContent: justifyContent(justify),
    alignItems: alignItems(align),
    flexDirection: column ? "column" : "row",
    flexWrap: wrap ? "wrap" : "nowrap",
});

export default flexWrapperStyles;
