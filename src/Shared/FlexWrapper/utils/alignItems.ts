import { AlignItemsOptions } from "../Types/AlignItemsOptions";

const alignItems = (property: AlignItemsOptions): string =>
    ({
        center: "center",
        start: "flex-start",
        end: "flex-end",
        stretch: "stretch",
    }[property] || "stretch");

export default alignItems;
