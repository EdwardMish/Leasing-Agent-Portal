import * as React from 'react'
import { Link } from 'react-router-dom'

import { Business } from '../../../State'
import { NoContent } from '../../../Shared/PageElements'
import { Search } from '../../../Shared/Search'

const styles = require('./occupant-list.module.css')

interface OccupantListProps {
    occupants: Business.Types.Occupant[];
}

export const OccupantList: React.FC<OccupantListProps> = ({ occupants }) => {
    const [occupantList, setOccupantList] = React.useState<Business.Types.Occupant[]>(occupants)

    const handleSearch = (value): void => {
        const term: string = value.toLowerCase()

        setOccupantList(occupants.filter(({ marketingName, propertyName }: Business.Types.Occupant) => marketingName.toLowerCase().includes(term) || propertyName.toLowerCase().includes(term)))
    }

    const resetList = (): void => {
        setOccupantList(occupants)
    }

    return (
        <>
            <h1>Business Administration</h1>
            <div style={{ margin: '0 0 1rem' }}>
                <Search
                    handler={handleSearch}
                    cleanUpCallback={resetList}
                    clearCallback={resetList}
                    placeholder='Search Business(es)'
                />
            </div>
            <>
                {
                    !!(occupantList.length)
                        ? <>
                            {
                                occupantList.map(({ id, marketingName, propertyName }: Business.Types.Occupant) =>
                                    <Link key={`occupant-list-${id}`} to={`/business/${id}`}>
                                        <div className={styles.OccupantListItem}>
                                            <h2>{marketingName}</h2>
                                            <p>{`@ ${propertyName}`}</p>
                                        </div>
                                    </Link>)
                            }
                        </>
                        : <NoContent message='No Business(es) Found' />
                }
            </>
        </>
    )
}