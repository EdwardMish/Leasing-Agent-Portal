import { PropertyWithOccupants } from '../../Shared/Types'
import { Occupant } from '../Types/Occupant'

export const mapOccupantsToPropertyWithOccupants = (occupants: Occupant[]): PropertyWithOccupants[] => {
    const properties: PropertyWithOccupants[] = Object.values(occupants
        .reduce((agg: { [key: string]: PropertyWithOccupants }, curr: Occupant) =>
            agg.hasOwnProperty(curr.propertyId)
                ? ({
                    ...agg,
                    [curr.propertyId]: {
                        ...agg[curr.propertyId],
                        occupants: [
                            ...agg[curr.propertyId].occupants,
                            {
                                id: curr.id,
                                name: curr.marketingName
                            }
                        ]
                    }
                }) : ({
                    ...agg,
                    [curr.propertyId]: {
                        id: curr.propertyId,
                        name: curr.propertyName,
                        occupants: [
                            {
                                id: curr.id,
                                name: curr.marketingName
                            }
                        ]
                    }
                }), {}))

    return properties.sort((a: PropertyWithOccupants, b: PropertyWithOccupants) => a.name.localeCompare(b.name))
}