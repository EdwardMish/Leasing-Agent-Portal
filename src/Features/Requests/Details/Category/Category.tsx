import { RequestsAPI } from 'API/Requests';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import { Pencil } from '../../../../Icons';
import { SelectInputs } from '../../../../Shared/Forms';
import { globalMessageActionCreators, Requests } from '../../../../State';

const requestStyles = require('./request-category.module.css');

interface CategoryProps {
    requestId: number;
}

export const Category: React.FC<CategoryProps> = ({ requestId }) => {
    const dispatch = useDispatch();
    const { selectors } = Requests;

    const request: Requests.Types.Request = useSelector(selectors.request(requestId));
    const categories: { [categoryId: string]: Requests.Types.Category } = useSelector(selectors.categories);
    const categoryList: Requests.Types.Category[] = useSelector(selectors.categoriesList);
    const [showModal, toggleModal] = React.useState<boolean>(false);
    const [requestCategory, setRequestCategory] = React.useState<string>('');
    const [requestSubcategory, setRequestsubcategory] = React.useState<string>('');

    const categoryHasSubcategories = ({ categoryId }): boolean =>
        !!categories[categoryId] && !!categories[categoryId].subcategories && !!categories[categoryId].subcategories.length;

    const updateCategory = ({ categoryId, subcategoryId }) => {
        if (categoryId != requestCategory && subcategoryId === requestSubcategory) {
            subcategoryId = '';
        }
        RequestsAPI.changeCategory(requestId, categoryId, subcategoryId)
            .then(() => {
                setRequestCategory(categoryId);
                setRequestsubcategory(subcategoryId);
                toggleModal(false);

                dispatch({
                    type: Requests.Actions.UPDATE_CATEGORY,
                    payload: {
                        id: requestId,
                        category: categories[categoryId],
                    },
                } as Requests.ActionTypes);

                dispatch({
                    type: Requests.Actions.UPDATE_SUBCATEGORY,
                    payload: {
                        id: requestId,
                        subcategory: categories[categoryId].subcategories.filter((_) => _.id == subcategoryId)[0] || null,
                    },
                } as Requests.ActionTypes);

                dispatch(globalMessageActionCreators.addSuccessMessage(`Category updated for Request #${requestId}`));
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage(`Failed to update Category for Request #${requestId}`));
            });
    };

    React.useEffect(() => {
        setRequestCategory(request.category.id);
        setRequestsubcategory(request.subcategory?.id ?? '');
    }, [request, categories]);

    return (
        <>
            {showModal && (
                <Formik
                    initialValues={{
                        categoryId: requestCategory || request.category.id,
                        subcategoryId: requestSubcategory || request.subcategory?.id || '',
                    }}
                    onSubmit={updateCategory}
                >
                    {({ values, isSubmitting, handleSubmit }) => (
                        <Form>
                            <ModalWithAction
                                header="Change Category"
                                actionText="Update Category"
                                disable={isSubmitting}
                                cancelCallback={() => toggleModal(false)}
                                actionCallback={handleSubmit}
                            >
                                <div className={requestStyles.ModalContent}>
                                    <div>
                                        <SelectInputs.HorizontalSelect
                                            id="category"
                                            name="categoryId"
                                            label="Category:"
                                            labelWidth="7rem"
                                            selectWidth="calc(100% - 7rem)"
                                        >
                                            {categoryList.map(({ id, name }) => (
                                                <option key={`request-category-${id}`} value={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </SelectInputs.HorizontalSelect>
                                    </div>
                                    {categoryHasSubcategories(values) && (
                                        <div>
                                            <SelectInputs.HorizontalSelect
                                                id="subcategory"
                                                name="subcategoryId"
                                                label="Subcategory:"
                                                labelWidth="7rem"
                                                selectWidth="calc(100% - 7rem)"
                                            >
                                                <option value="">No Subcategory Selected</option>
                                                {categories[values.categoryId].subcategories.map(({ id, name }) => (
                                                    <option key={`request-subcategory-${id}`} value={id}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </SelectInputs.HorizontalSelect>
                                        </div>
                                    )}
                                </div>
                            </ModalWithAction>
                        </Form>
                    )}
                </Formik>
            )}
            <div className={requestStyles.Row}>
                <p>Category:</p>
                <p>{categories[requestCategory]?.name ?? ''}</p>
                <div
                    className={requestStyles.RowIcon}
                    onClick={() => {
                        toggleModal(true);
                    }}
                >
                    <Pencil />
                </div>
            </div>
            <div className={requestStyles.Row}>
                <p>Subcategory:</p>
                <p>
                    {categories[requestCategory]?.subcategories.filter((_) => _.id == requestSubcategory)[0]?.name ?? 'None'}
                </p>
                <div
                    className={requestStyles.RowIcon}
                    onClick={() => {
                        toggleModal(true);
                    }}
                >
                    <Pencil />
                </div>
            </div>
        </>
    );
};

