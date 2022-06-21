import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { LoadingContent, SecondaryTitle, Title } from '../../../../Shared/PageElements';
import { PageWrapper } from '../../../../Shared/PageWrapper';
import { Sales } from '../../../../State';
import { currentUserHasPermission } from '../../../../State/CurrentUser/selectors';
import { UserPermissions } from '../../../../Types';
import { getRootPath } from '../../../../utils';
import { PriorityList } from '../PriorityList';
import styles from './tenant-sales-dashboard.module.css';

export const TenantSalesDashboard: React.FC<{}> = () => {
    let { path } = useRouteMatch();

    const hasSubmitSalesPermission: boolean = useSelector(currentUserHasPermission(UserPermissions.SubmitSales));

    const { areLoaded, occupants } = Sales.Hooks.useOccupantsFromSalesState();

    const rootPath = getRootPath(path, '/sales');

    return (
        <PageWrapper pageTitle="Sales">
            {areLoaded ? (
                <>
                    <Title title="Sales"  />
                    {hasSubmitSalesPermission && <PriorityList />}
                    <SecondaryTitle title="Locations" />
                    {occupants.map(({ id, name, propertyName }: Sales.Types.Occupant) => (
                        <Link key={`occupant-select-${id}`} className={styles.OccupantListSelect} to={`${rootPath}/${id}`}>
                            <p>{name}</p>
                            <p>{propertyName}</p>
                        </Link>
                    ))}
                </>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
};
