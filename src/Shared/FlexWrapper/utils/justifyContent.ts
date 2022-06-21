import { JustifyContentOptions } from "../Types/JustifyContentOptions";

const justifyContent = (property: JustifyContentOptions): string =>
    ({
        start: "flex-start",
        end: "flex-end",
        center: "center",
        around: "space-around",
        between: "space-between",
    }[property] || "flex-start");

export default justifyContent;
