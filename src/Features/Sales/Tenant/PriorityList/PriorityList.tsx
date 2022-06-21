import getPrioritySalesItems from 'API/Sales/API/getPrioritySalesItems';
import * as React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { SecondaryTitle } from '../../../../Shared/PageElements';
import { PrioritySalesItem } from '../../../../Types';
import { getRootPath, monthsNumeric } from '../../../../utils';

const styles = require('./priority-list.module.css');

export const PriorityList: React.FC<{}> = () => {
    let { path } = useRouteMatch();
    const [priorityItems, setPriorityItems] = React.useState<PrioritySalesItem[]>([]);

    React.useEffect(() => {
        getPrioritySalesItems()
            .then((items: PrioritySalesItem[]) => {
                const sortedItems = items
                    .filter((a) => a.year === 2020)
                    .sort((a, b) => b.month - a.month)
                    .slice(0, 3);

                setPriorityItems(sortedItems);
            })
            .catch((err) => console.log('Error retrieving items: ', err));
    }, []);

    const priorityStatus = (status: string) => {
        let priority: string = '';

        switch (status) {
            case 'almostDue':
                priority = 'Almost Due';
                break;
            case 'canSubmit':
                priority = 'Upcoming';
                break;
            case 'exceededDueDate':
                priority = 'Overdue';
                break;
        }

        return `(${priority})`;
    };

    const rootPath = getRootPath(path, '/sales');

    return (
        <>
            {' '}
            {priorityItems.length > 0 ? (
                <div className={styles.PriorityList}>
                    <SecondaryTitle title="Priority Sales Items" />
                    {priorityItems.map((item: PrioritySalesItem) => (
                        <Link
                            key={`item-${item.occupantId}-${item.month}-${item.year}`}
                            to={`${rootPath}/submit/${item.occupantId}/${item.year}/${item.month}`}
                        >
                            <p className={styles.PriorityListItemOccupant}>{item.occupantName}</p>
                            <p className={styles.PriorityListItemProperty}>{item.propertyName}</p>
                            <p>{`Date Due: ${monthsNumeric[item.month]}/${item.year} ${priorityStatus(
                                item.submissionPriority as unknown as string,
                            )}`}</p>
                        </Link>
                    ))}
                </div>
            ) : null}{' '}
        </>
    );
};

