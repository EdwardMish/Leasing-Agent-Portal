import * as React from "react";

import { ComplianceStatus, ComplianceType } from "../../../API/Compliance/Types";

import { complianceDisplayName } from "../../../utils";

import { IconColors } from "../../../Icons";

import { FlexWrapper } from "../../FlexWrapper";

interface StatusBarProps {
    status: ComplianceStatus;
    type: ComplianceType;
    showChildren: ComplianceStatus[];
}

const borderGrey = "rgb(220, 220, 220)";

const statusColors = (status: ComplianceStatus) =>
    ({
        notsubmitted: {
            main: IconColors.DarkGrey,
            secondary: IconColors.OffWhite,
            border: borderGrey,
        },
        pending: {
            main: IconColors.DarkGrey,
            secondary: IconColors.OffWhite,
            border: borderGrey,
        },
        approved: {
            main: IconColors.SucccessGreen,
            secondary: IconColors.SucccessGreenSecondary,
            border: IconColors.SucccessGreen,
        },
        declined: {
            main: IconColors.WarningRed,
            secondary: IconColors.WarningRedSecondary,
            border: IconColors.WarningRed,
        },
        expired: {
            main: IconColors.WarningRed,
            secondary: IconColors.WarningRedSecondary,
            border: IconColors.WarningRed,
        },
    }[status.toLowerCase()]);

export const StatusBar: React.FC<StatusBarProps> = ({ children, showChildren, status, type }) => (
    <div
        style={{
            color: statusColors(status)?.main || IconColors.DarkGrey,
            border: "1px solid",
            borderColor: statusColors(status)?.border || borderGrey,
            backgroundColor: statusColors(status)?.secondary || IconColors.OffWhite,
            padding: "1rem",
            borderRadius: "0.25rem",
        }}
    >
        <FlexWrapper
            align="center"
            justify="between"
            style={{
                fontWeight: 700,
            }}
        >
            <p>Status:</p>
            <p>{complianceDisplayName(status, type)}</p>
        </FlexWrapper>
        {showChildren.includes(status) && <div style={{ margin: "1rem 0 0" }}>{children}</div>}
    </div>
);
