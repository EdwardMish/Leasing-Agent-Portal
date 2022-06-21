import * as React from 'react';
import { useSelector } from 'react-redux';

import { SelectInputs } from '../../../../Shared/Forms';
import { CurrentUserState, Requests } from '../../../../State';

const styles = require('./category-select.module.css');

interface CategorySelectProps {
    currentCategoryId: string;
    required?: boolean;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ currentCategoryId, required = false }) => {
    const { selectors } = Requests;

    const categories: Requests.Types.Category[] = useSelector(selectors.categoriesList);
    const categoriesAreLoaded: boolean = useSelector(selectors.categoriesAreLoaded);
    const subcategories: Requests.Types.Subcategory[] = useSelector(selectors.subcategories(currentCategoryId));

    const userIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    return (
        <>
            {categoriesAreLoaded ? (
                <div className={styles.CategorySelect}>
                    <SelectInputs.Select required={required} label="Category" id="category" name="categoryId">
                        <option value="">Choose a Category</option>
                        {categories.map(({ id, name }) => (
                            <option key={`category-select-${id}`} value={id}>
                                {name}
                            </option>
                        ))}
                    </SelectInputs.Select>
                    {!userIsTenant && subcategories && !!subcategories.length && (
                        <SelectInputs.Select label="Subcategory" id="subcategory" name="subcategoryId">
                            <option value="">Choose a Subcategory</option>
                            {subcategories.map(({ id, name }) => (
                                <option key={`subcategory-select-${id}`} value={id}>
                                    {name}
                                </option>
                            ))}
                        </SelectInputs.Select>
                    )}
                </div>
            ) : null}
        </>
    );
};
