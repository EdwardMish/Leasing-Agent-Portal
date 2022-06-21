import * as React from 'react';
import { SelectInputs } from '../../../Shared/Forms';
import {
    InspectionCategories,
    InspectionCategoriesDisplayName
} from '../../../State/Inspections/Types/InspectionCategories';

interface Properties {
    name?: string;
}

const CategorySelect = ({
    name = 'categoryId',
}: Properties): React.ReactElement => {

    return (
        <SelectInputs.Select
            label="Categories"
            id="categories"
            name={name}
            hideLabel
            style={{
                width: '100%',
                height: '3rem',
                backgroundColor: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                // TODO: Update to pull CSS vars off object
                color: 'var(--color-BrandBlue)',
                border: '2px solid var(--color-BrandBlue)',
                textTransform: 'uppercase',
                letterSpacing: '0.125rem',
            }}
        >
            <option
                id={`category-select-${InspectionCategories.Property}`}
                value={InspectionCategories.Property}
            >
                Category (None)
            </option>
            <option
                id={`category-select-${InspectionCategories.Building}`}
                value={InspectionCategories.Building}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.Building]}
            </option>
            <option
                id={`category-select-${InspectionCategories.Dumpster}`}
                value={InspectionCategories.Dumpster}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.Dumpster]}
            </option>
            <option
                id={`category-select-${InspectionCategories.FireSystems}`}
                value={InspectionCategories.FireSystems}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.FireSystems]}
            </option>
            <option
                id={`category-select-${InspectionCategories.Landscaping}`}
                value={InspectionCategories.Landscaping}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.Landscaping]}
            </option>
            <option
                id={`category-select-${InspectionCategories.Lighting}`}
                value={InspectionCategories.Lighting}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.Lighting]}
            </option>
            <option
                id={`category-select-${InspectionCategories.ParkingLot}`}
                value={InspectionCategories.ParkingLot}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.ParkingLot]}
            </option>
            <option
                id={`category-select-${InspectionCategories.Sidewalk}`}
                value={InspectionCategories.Sidewalk}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.Sidewalk]}
            </option>
            <option
                id={`category-select-${InspectionCategories.Signage}`}
                value={InspectionCategories.Signage}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.Signage]}
            </option>
            <option
                id={`category-select-${InspectionCategories.VacantUnits}`}
                value={InspectionCategories.VacantUnits}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.VacantUnits]}
            </option>
            <option
                id={`category-select-${InspectionCategories.Roof}`}
                value={InspectionCategories.Roof}
            >
                {InspectionCategoriesDisplayName[InspectionCategories.Roof]}
            </option>
        </SelectInputs.Select>
    )
};

export default CategorySelect;
