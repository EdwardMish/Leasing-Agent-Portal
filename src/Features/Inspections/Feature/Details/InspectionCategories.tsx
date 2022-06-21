import * as React from 'react';
import { useParams } from 'react-router-dom';

import { InspectionCategories } from '../../../../State/Inspections/Types/InspectionCategories';

import CategoryBlock from './CategoryBlock';

export default (): React.ReactElement => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    return (
        <>
            <ul style={{
                listStyleType: 'none',
                margin: 0,
                padding: 0,
            }}
            >
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Property} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Dumpster} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.FireSystems} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Landscaping} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Lighting} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.ParkingLot} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Sidewalk} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Signage} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.VacantUnits} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Roof} />
                </li>
                <li>
                    <CategoryBlock inspectionId={inspectionId} categoryId={InspectionCategories.Building} />
                </li>
            </ul>
        </>
    );
}
