import React from "react";
import { useDispatch } from "react-redux";
import Compliance, {
    ComplianceStatus,
    ComplianceType,
    ComplianceTypeDisplayNames,
    OccupantCompliance
} from "../../../API/Compliance";

import { Button } from "../../../Shared/Button";
import { Documents } from "../../../Shared/Compliance/Documents";
import { Notes } from "../../../Shared/Compliance/Notes";
import { StatusBar } from "../../../Shared/Compliance/StatusBar";
import { FlexWrapper } from "../../../Shared/FlexWrapper";

import { globalMessageActionCreators } from "../../../State";

import ComplianceConfirmationModal from "./ComplianceConfirmationModal";

import styles = require("./occupant-compliance.module.css");

interface Properties {
    occupantId: number;
    compliance: OccupantCompliance;
    canAdministrate: boolean;
    reloadCompliance: () => void;
}

export default ({
    occupantId,
    compliance,
    canAdministrate,
    reloadCompliance,
}: Properties): React.ReactElement => {
    const dispatch = useDispatch();

    const { complianceStatus, complianceType, notes } = compliance;

    const [showApprove, toggleShowApprove] = React.useState<boolean>(false);
    const [showDecline, toggleShowDecline] = React.useState<boolean>(false);

    const addNote = (note: string, reload = false) => {
        Compliance.addNote(occupantId, complianceType, note)
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage("Note successfully added."));
                if (reload) reloadCompliance();
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage("Unable to add note, please try again."),
                );
            });
    };

    const approve = (note: string) => {
        Compliance.approveDocument(occupantId, complianceType)
            .then(() => {
                if (note) addNote(`${complianceType === ComplianceType.Signage ? "APPROVAL" : "ACKNOWLEDGEMENT"} NOTE: ${note}`);
                dispatch(
                    globalMessageActionCreators.addSuccessMessage("Compliance document(s) acknowledged."),
                );
                reloadCompliance();
                toggleShowApprove(false);
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage("Acknowledge failed, please try again."),
                );
            });
    };

    const decline = (note: string) => {
        Compliance.declineDocument(occupantId, complianceType)
            .then(() => {
                addNote(`DECLINED NOTE: ${note}`);
                dispatch(globalMessageActionCreators.addSuccessMessage("Compliance document(s) declined."));
                reloadCompliance();
                toggleShowDecline(false);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage("Decline failed, please try again."));
            });
    };

    return (
        <>
            <FlexWrapper justify="between" align="stretch" className={styles.ComplianceColumns}>
                <div>
                    <StatusBar status={complianceStatus} type={complianceType} showChildren={[]} />
                </div>
                <div>
                    <Documents occupantId={occupantId} type={complianceType} />
                </div>
            </FlexWrapper>
            <div>
                <Notes
                    notes={notes || []}
                    canAddNote={canAdministrate}
                    addNote={(note: string) => addNote(note, true)}
                />
            </div>
            {(complianceStatus === ComplianceStatus.Pending ||
                complianceStatus === ComplianceStatus.PendingNotRequired) &&
                canAdministrate && (
                    <FlexWrapper justify="between" align="center" className={styles.ComplianceColumns}>
                        <div>
                            <Button
                                fullWidth
                                withMarginTop
                                text="Decline"
                                callback={() => toggleShowDecline(true)}
                                lowProfile
                                inverse
                            />
                        </div>
                        <div>
                            <Button
                                fullWidth
                                withMarginTop
                                text={complianceType === ComplianceType.Signage ? "Approve" : "Acknowledge"}
                                callback={() => toggleShowApprove(true)}
                                lowProfile
                            />
                        </div>
                    </FlexWrapper>
                )}
            {showApprove && (
                <ComplianceConfirmationModal
                    noteLabel="Please provide additional comments"
                    title={`Approve ${ComplianceTypeDisplayNames[complianceType]}`}
                    confirm={(note) => {
                        approve(note);
                    }}
                    handleCancel={() => toggleShowApprove(false)}
                />
            )}
            {showDecline && (
                <ComplianceConfirmationModal
                    noteLabel="Please provide reason for declining"
                    noteRequired
                    title={`Decline ${ComplianceTypeDisplayNames[complianceType]}`}
                    confirm={(note) => {
                        decline(note);
                    }}
                    handleCancel={() => toggleShowDecline(false)}
                >
                    <p style={{ margin: "0 0 0.5rem", lineHeight: "1.75" }}>
                        When declining a Compliance Submission, you must add a reason for declining.
                    </p>
                </ComplianceConfirmationModal>
            )}
        </>
    );
};
