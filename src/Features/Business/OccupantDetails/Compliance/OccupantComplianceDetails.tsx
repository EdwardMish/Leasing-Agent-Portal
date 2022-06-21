import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Shared/Modal/Modal';
import Compliance, {
    ComplianceStatus,
    ComplianceType,
    ComplianceTypeDisplayNames,
    OccupantCompliance,
} from '../../../../API/Compliance';
import { Button } from '../../../../Shared/Button';
import { Documents, StatusBar } from '../../../../Shared/Compliance';
import { Notes, NotRequiredPopup } from '../../../../Shared/Compliance/Notes';
import { LoadingContent, SecondaryTitle } from '../../../../Shared/PageElements';
import { CurrentUserState, globalMessageActionCreators } from '../../../../State';
import { UserPermissions } from '../../../../Types';
import UploadComplianceAttachment from './UploadComplianceAttachment';

import styles = require('../occupant-details.module.css');

interface Properties {
    occupantId: number;
}

const complianceSet: ComplianceType[] = [
    ComplianceType.CertificateOfInsurance,
    ComplianceType.Signage,
    ComplianceType.Plans,
    ComplianceType.Permits,
];

export default ({ occupantId }: Properties): React.ReactElement => {
    const dispatch = useDispatch();

    const canAdministrateBusiness: boolean = useSelector(
        CurrentUserState.selectors.currentUserHasPermissionForOccupant(UserPermissions.AdministrateBusiness, occupantId),
    );

    const [compliances, setCompliance] = React.useState<OccupantCompliance[]>([]);
    const [complianceLoaded, setComplianceLoaded] = React.useState<boolean>(false);
    const [showUploadModal, toggleUploadModal] = React.useState<boolean>(false);
    const [showNotRquiredModal, toggleNotRequiredModal] = React.useState<boolean>(false);
    const [selectedComplianceType, setSelectedComplianceType] = React.useState<ComplianceType | undefined>(undefined);

    const loadCompliance = (): Promise<void> =>
        Compliance.getOccupantCompliance(occupantId).then((res) => {
            setCompliance(res);
            setComplianceLoaded(true);
        });

    React.useEffect(() => {
        loadCompliance();
    }, [occupantId]);

    const showModal = (complianceType: ComplianceType) => {
        if (canAdministrateBusiness) {
            setSelectedComplianceType(complianceType);
            toggleUploadModal(true);
        }
    };

    const handleClose = (): void => {
        toggleUploadModal(false);
    };

    const handleRefresh = (): void => {
        loadCompliance();
    };

    const addNote = (note: string, complianceType: ComplianceType) => {
        Compliance.addNote(occupantId, complianceType, note)
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage('Note successfully added.'));
                handleRefresh();
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to add note, please try again.'));
            });
    };

    const requestNotRequired = (complianceType: ComplianceType, note: string) => {
        Compliance.skipCompliance(occupantId, complianceType)
            .then(() => {
                addNote(note, complianceType);
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage('Unable to mark Compliance Documents as not required.'),
                );
            });
    };

    return (
        <>
            {complianceLoaded ? (
                <>
                    {complianceSet.map((type: ComplianceType) => {
                        const complianceItem = compliances.find((com) => com.complianceType === type);

                        const status: ComplianceStatus =
                            complianceItem && complianceItem.complianceStatus
                                ? complianceItem.complianceStatus
                                : ComplianceStatus.NotSubmitted;

                        return (
                            <div key={`compliance-table-${type}`} style={{ marginBottom: '1.25rem' }}>
                                <SecondaryTitle title={ComplianceTypeDisplayNames[type] || type} />
                                <div className={styles.TwoColums} style={{ alignItems: 'stretch !important' }}>
                                    <div>
                                        <StatusBar status={status} type={type} showChildren={[]} />
                                    </div>
                                    <div>
                                        <Documents occupantId={occupantId} type={type} />
                                        <Button
                                            callback={() => {
                                                showModal(type);
                                            }}
                                            text="Upload Document(s)"
                                            fullWidth
                                            withMarginTop
                                            lowProfile
                                        />
                                        {type !== ComplianceType.CertificateOfInsurance &&
                                        status === ComplianceStatus.NotSubmitted &&
                                        canAdministrateBusiness ? (
                                            <Button
                                                callback={() => {
                                                    toggleNotRequiredModal(true);
                                                }}
                                                text="Not Required"
                                                fullWidth
                                                withMarginTop
                                                lowProfile
                                            />
                                        ) : null}
                                    </div>
                                </div>

                                {showNotRquiredModal && (
                                    <NotRequiredPopup
                                        handleClose={() => toggleNotRequiredModal(false)}
                                        requestNotRequired={(note: string) => requestNotRequired(type, note)}
                                    />
                                )}

                                <Notes
                                    notes={complianceItem?.notes || []}
                                    canAddNote={canAdministrateBusiness}
                                    addNote={(note: string) => addNote(note, type)}
                                />
                            </div>
                        );
                    })}
                </>
            ) : (
                <LoadingContent />
            )}
            {canAdministrateBusiness && showUploadModal && (
                <Modal
                    header={`Upload ${
                        selectedComplianceType ? ComplianceTypeDisplayNames[selectedComplianceType] : 'Documents'
                    }`}
                    callBack={handleClose}
                >
                    <div
                        style={{
                            padding: '1rem',
                        }}
                    >
                        <UploadComplianceAttachment
                            complianceType={selectedComplianceType}
                            occupantId={occupantId}
                            closeCallback={handleClose}
                            refreshCallback={handleRefresh}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};

