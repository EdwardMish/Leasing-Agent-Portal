import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from 'State/CurrentUser/Hooks';
import { ChevronLeft, IconColors } from '../../../Icons';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { useLeasingState } from '../../../State/Leasing/Hooks';

function LeftHeaderComponent(): React.ReactElement {
    const history = useHistory();

    const { currentUser, isCurrentUserLoaded } = useCurrentUser();

    const [showDashboardLink, setShowDashboardLink] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isCurrentUserLoaded) {
            if (!!currentUser.tenant && !!currentUser.tenant.occupants) {
                setShowDashboardLink(true);
            }
        }
    }, [currentUser, isCurrentUserLoaded]);

    const { pauseActiveApplication } = useLeasingState();

    const gotoDashboard = () => {
        pauseActiveApplication();
        history.push('/');
    };

    return (
        <>
            {showDashboardLink ? (
                <div style={{ cursor: 'pointer' }} onClick={() => gotoDashboard()}>
                    <FlexWrapper align="center" justify="start">
                        <ChevronLeft aspect="1.25rem" color={IconColors.BrandBlue} />
                        <p
                            style={{
                                margin: '0 0 0 0.125rem',
                                color: IconColors.BrandBlue,
                                fontWeight: 700,
                            }}
                        >
                            Dashboard
                        </p>
                    </FlexWrapper>
                </div>
            ) : null}
        </>
    );
}

export default LeftHeaderComponent;
