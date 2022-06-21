import { RequestsAPI, RequestsTypes } from 'API/Requests';
import { Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { FilterColumn, PagedSortedFilteredRequestParams } from '../../../../API/Shared/PagedSortedFilteredRequest';
import { MagnifyingGlass } from '../../../../Icons';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { FormInputs, FormRow } from '../../../../Shared/Forms';
import { LoadingContent, NoContent } from '../../../../Shared/PageElements';
import { ScrollWrapper } from '../../../../Shared/ScrollWrapper';
import { Types as TableTypes } from '../../../../Shared/Table';
import { getSearchColumns } from '../../../../utils';
import { WatcherRow } from '../WatcherRow';

const styles = require('./available-watchers.module.css');

interface AvailableWatchersProps {
    currentWatchers: RequestsTypes.WatcherResponse[];
    requestId: number;
    watcherCallback: () => void;
}

const searchColumns = (term: string): FilterColumn[] =>
    getSearchColumns(term, [
        RequestsTypes.WatcherColumns.email,
        RequestsTypes.WatcherColumns.name,
        RequestsTypes.WatcherColumns.id,
    ]);

export const AvailableWatchers: React.FC<AvailableWatchersProps> = ({ currentWatchers, requestId, watcherCallback }) => {
    const [availableWatchers, setAvailableWatchers] = React.useState<any>([]);
    const [watchersLoaded, setWatchersLoaded] = React.useState<boolean>(false);
    const [pending, setPending] = React.useState<boolean>(false);

    const loadWatchers = (searchTerm: string) => {
        setPending(true);

        const params = new PagedSortedFilteredRequestParams(
            [
                {
                    columnName: RequestsTypes.WatcherColumns.name,
                    sortDirection: TableTypes.SortDirection.ASC,
                },
            ],
            [...searchColumns(searchTerm)],
            500,
            1,
        );

        RequestsAPI.getAvailableWatchers(params)
            .then((pagedResponse) => {
                setAvailableWatchers(pagedResponse.results);
                setWatchersLoaded(true);
                setPending(false);
            })
            .catch(() => {
                setPending(false);
            });
    };

    const isWatching = (id: number): boolean => currentWatchers.map(({ id }) => id).includes(id);

    const toggleWatcher = (id: number) => {
        isWatching(id)
            ? RequestsAPI.removeWatcher(requestId, id).then(() => {
                  watcherCallback();
              })
            : RequestsAPI.addWatcher(requestId, id).then(() => {
                  watcherCallback();
              });
    };

    return (
        <>
            <Formik
                initialValues={{
                    search: '',
                }}
                onSubmit={({ search: searchTerm }) => {
                    loadWatchers(searchTerm);
                }}
                validationSchema={Yup.object({
                    search: Yup.string().required('A search term is required'),
                })}
            >
                <Form>
                    <FlexWrapper justify="between" align="start">
                        <FormRow withMargin={false}>
                            <FormInputs.Text
                                id="search"
                                name="search"
                                label="Search Available Watchers"
                                hideLabel
                                required
                                fullWidth
                            />
                        </FormRow>
                        <button type="submit" className={styles.SearchIcon}>
                            <MagnifyingGlass />
                        </button>
                    </FlexWrapper>
                </Form>
            </Formik>
            {watchersLoaded ? (
                <ScrollWrapper style={{ marginTop: '0.5rem' }} maxHeight="20rem">
                    {availableWatchers.map(({ name, id, email }) => (
                        <WatcherRow
                            key={`available-watcher-list-${id}`}
                            toggleWatcher={toggleWatcher}
                            isWatching={isWatching(id)}
                            name={name}
                            id={id}
                            email={email}
                        />
                    ))}
                </ScrollWrapper>
            ) : pending ? (
                <LoadingContent lowProfile />
            ) : (
                <NoContent lowProfile message="Search Available Watchers" />
            )}
        </>
    );
};

