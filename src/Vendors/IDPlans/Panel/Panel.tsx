import * as React from 'react';
import { useSelector } from 'react-redux';

import { Menu } from '../../../Icons';

import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { LoadingContent, NoContent } from '../../../Shared/PageElements';

import { Properties } from '../../../State';
import { Property } from '../../../State/Shared/Types';

import { featureGroups } from '../featureGroups';

import { IDPlansNavigation } from '../Navigation';

import { IDPlanFeatures, IDPlansFeatureGroup } from '../Types';

import logo from './logo.png';

import { PanelContext } from './PanelContext';

import styles from './panel.module.css';
import { IDPlansAPI } from '../API';

interface PanelProps {
    propertyId: number;
}

const { Hooks, selectors } = Properties;

export const Panel: React.FC<PanelProps> = ({ propertyId }) => {
    const groups = featureGroups();

    const { areLoaded: propertiesAreLoaded } = Hooks.usePropertiesFromState();

    const property: Property = useSelector(selectors.property(propertyId));

    const [showNavigation, toggleNavigation] = React.useState<boolean>(true);
    const [featureGroup, setFeatureGroup] = React.useState<IDPlansFeatureGroup>(groups[IDPlanFeatures.Electric]);
    const [redirectLink, setRedirectLink] = React.useState<string>('');

    const handleNavigation = (groupIdentifier: string) => {
        if (groups[groupIdentifier]) {
            setFeatureGroup(groups[groupIdentifier]);
            toggleNavigation(false);
        }
    };

    React.useEffect(() => {
        if (!!property && property.name) {
            IDPlansAPI.getRedirectLink(property.id).then(({ link }) => {
                setRedirectLink(link);
            });
        }
    }, [property]);

    return (
        <>
            {propertiesAreLoaded ? (
                <>
                    <FlexWrapper justify="between" align="center" style={{ margin: '1rem 0' }}>
                        {showNavigation ? (
                            <div className={styles.MenuWrapper}>
                                <a className={styles.IDPlansLink} href={redirectLink} target="_blank" rel="noreferrer">
                                    <span>Property Details Powered by</span> <img src={logo} />
                                </a>
                                <p>Select a topic to view details</p>
                            </div>
                        ) : (
                            <>
                                {featureGroup ? (
                                    <p className={styles.FeatureGroupHeader} style={{ borderColor: featureGroup.color }}>
                                        {featureGroup.display}
                                    </p>
                                ) : (
                                    <p />
                                )}
                            </>
                        )}
                        {!showNavigation && (
                            <div
                                className={styles.HeaderIcon}
                                onClick={() => {
                                    toggleNavigation(true);
                                }}
                            >
                                <Menu />
                            </div>
                        )}
                    </FlexWrapper>
                    <PanelContext.Provider value={propertyId}>
                        {showNavigation ? (
                            <IDPlansNavigation handler={handleNavigation} />
                        ) : featureGroup ? (
                            <featureGroup.Component />
                        ) : (
                            <NoContent message="We are having trouble accessing that part of ID Plans." />
                        )}
                    </PanelContext.Provider>
                </>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
