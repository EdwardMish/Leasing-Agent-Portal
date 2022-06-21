import * as React from 'react';
import { useSelector } from 'react-redux';

import Compliance, {
    ComplianceType,
    ComplianceTypeDisplayNames,
    OccupantCompliance,
} from '../../../API/Compliance';

import { LoadingContent, NoContent, SecondaryTitle } from '../../../Shared/PageElements';

import { CurrentUserState } from '../../../State';

import { UserRoles } from '../../../Types';

import ComplianceDetails from './ComplianceDetails';

const complianceSet: ComplianceType[] = [
    ComplianceType.CertificateOfInsurance,
    ComplianceType.Signage,
    ComplianceType.Plans,
    ComplianceType.Permits,
];

interface Properties {
    occupantId: number;
}

export default ({ occupantId }: Properties): React.ReactElement => {
    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);

    const isOwnerOperatorAdmin: boolean = useSelector(CurrentUserState.selectors.currentUserIsOwnerOperatorAdmin);

    const canAdministrateComplianceType = {
        [ComplianceType.CertificateOfInsurance]: () => isOwnerOperatorAdmin
            || (
                !!currentUser.ownerOperator
                && currentUser.ownerOperator.occupantIds.some((_) => _ === occupantId)
                && currentUser.ownerOperator.roles.some((cr) => cr.id === UserRoles.OORiskManagementCoordinator)
            ),
        [ComplianceType.Plans]: () => isOwnerOperatorAdmin
            || (
                !!currentUser.ownerOperator
                && currentUser.ownerOperator.occupantIds.some((_) => _ === occupantId)
                && currentUser.ownerOperator.roles.some((cr) => cr.id === UserRoles.OOConstruction)
            ),
        [ComplianceType.Permits]: () => isOwnerOperatorAdmin
            || (
                !!currentUser.ownerOperator
                && currentUser.ownerOperator.occupantIds.some((_) => _ === occupantId)
                && currentUser.ownerOperator.roles.some((cr) => cr.id === UserRoles.OOConstruction)
            ),
        [ComplianceType.Signage]: () => isOwnerOperatorAdmin
            || (
                !!currentUser.ownerOperator
                && currentUser.ownerOperator.occupantIds.some((_) => _ === occupantId)
                && currentUser.ownerOperator.roles.some((cr) => cr.id === UserRoles.OOPropertyManager)
            ),
    };

    const [complianceLoaded, setLoaded] = React.useState<boolean>(false);
    const [compliance, setCompliance] = React.useState<OccupantCompliance[]>([]);

    const loadCompliance = () => {
        Compliance.getOccupantCompliance(occupantId)
            .then((result) => {
                setCompliance(result);
                setLoaded(true);
            });
    };

    React.useEffect(() => {
        loadCompliance();
    }, [occupantId]);

    return (
        <>
            {
                complianceLoaded
                    ? (
                        <>
                            {
                                complianceSet.map((type: ComplianceType) => {
                                    const currentSet = compliance.find((com) => com.complianceType === type);

                                    return (
                                        <div key={`compliance-table-${type}`} style={{ marginBottom: '1.25rem' }}>
                                            <SecondaryTitle title={ComplianceTypeDisplayNames[type] || type} />
                                            {
                                                currentSet
                                                    ? (
                                                        <ComplianceDetails
                                                            occupantId={occupantId}
                                                            compliance={currentSet}
                                                            canAdministrate={canAdministrateComplianceType[type]()}
                                                            reloadCompliance={loadCompliance}
                                                        />
                                                    )
                                                    : (
                                                        <NoContent
                                                            message={
                                                                `${ComplianceTypeDisplayNames[type]} has not been submitted.`
                                                            }
                                                        />
                                                    )
                                            }
                                        </div>
                                    );
                                })
                            }
                        </>
                    )
                    : <LoadingContent />
            }
        </>
    );
};
