import * as React from 'react';

import { InspectionCategories } from '../../../../State/Inspections/Types/InspectionCategories';

import CategoryBlock from './CategoryBlock';

export default (): React.ReactElement => (
    <>
        <ul style={{
            listStyleType: 'none',
            margin: 0,
            padding: 0,
        }}
        >
            <li>
                <CategoryBlock categoryId={InspectionCategories.Property} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.Dumpster} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.FireSystems} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.Landscaping} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.Lighting} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.ParkingLot} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.Sidewalk} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.Signage} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.VacantUnits} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.Roof} />
            </li>
            <li>
                <CategoryBlock categoryId={InspectionCategories.Building} />
            </li>
        </ul>
    </>
);
