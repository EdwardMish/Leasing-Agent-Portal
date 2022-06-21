import { RequestsAPI, RequestsTypes } from 'API/Requests';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AnimatedIcons, ArrowRightCircle } from '../../../../Icons';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import { IconWithTextWithCallback } from '../../../../Shared/PageElements';
import { Components } from '../../../../Shared/Table';
import PrependWrapper from '../../../../Shared/Table/PrependWrapper';
import { CurrentUserState, globalMessageActionCreators } from '../../../../State';
import { correctCamelCaseWord } from '../../../../utils';
import { CellWrapper } from '../CellWrapper';
import { RequestSummaryToggle } from '../RequestSummaryToggle';
import { RequestTableRowProps } from '../RequestTableRow';
import { toDoListColumns } from './toDoListColumns';

const styles = require('./to-do-list-row.module.css');

type ToDoListRowProps = RequestTableRowProps;

const idColumn = toDoListColumns[0];
const daysOpenColumn = toDoListColumns[1];
const nameColumn = toDoListColumns[2];
const priorityColumn = toDoListColumns[3];

// TODO: Move name maps into another area, i.e. Category, Subcategory, etc as well
const capitalizeStatus = (record, operator: string) =>
    operator === RequestsTypes.ListColumns.status || operator === RequestsTypes.ListColumns.priority
        ? correctCamelCaseWord(record[operator])
        : record[operator];

export const ToDoListRow: React.FC<ToDoListRowProps> = ({ dataRecord, rowWrapper, toggleSummary, showSummaryForId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const [pending, togglePending] = React.useState<boolean>(false);

    const startWorking = () => {
        if (pending) return;

        togglePending(true);

        RequestsAPI.startWorking(dataRecord.requestId)
            .then(() => {
                dispatch(
                    globalMessageActionCreators.addSuccessMessage('You have successfully started working the Request.'),
                );
                history.push(`/requests/details/${dataRecord.requestId}`);
            })
            .catch((err) => {
                togglePending(false);

                if (err.hasOwnProperty('response')) {
                    const { response = {} } = err;

                    if (
                        response.hasOwnProperty('status') &&
                        response.status === 400 &&
                        response.hasOwnProperty('data') &&
                        response.data.hasOwnProperty('name')
                    ) {
                        dispatch(
                            globalMessageActionCreators.addErrorMessage(`Request already assigned to ${response.data.name}`),
                        );
                    } else {
                        dispatch(globalMessageActionCreators.addErrorMessage('Unable to start work on the Request.'));
                    }
                } else {
                    dispatch(globalMessageActionCreators.addErrorMessage('Unable to start work on the Request.'));
                }
            });
    };

    const linkTarget = `/requests/details/${dataRecord.requestId}`;

    return (
        <Components.Row rowWrapper="div">
            <CellWrapper
                key={`table-row-${dataRecord.requestId}-${idColumn.operator}`}
                linkTarget={linkTarget}
                rowWrapper={rowWrapper}
                width={idColumn.width}
            >
                <PrependWrapper data={capitalizeStatus(dataRecord, idColumn.operator)} display={idColumn.display} />
            </CellWrapper>
            <CellWrapper
                key={`table-row-${dataRecord.requestId}-${daysOpenColumn.operator}`}
                linkTarget={linkTarget}
                rowWrapper={rowWrapper}
                width={daysOpenColumn.width}
            >
                <PrependWrapper
                    data={capitalizeStatus(dataRecord, daysOpenColumn.operator)}
                    display={daysOpenColumn.display}
                />
            </CellWrapper>
            <CellWrapper
                key={`table-row-${dataRecord.requestId}-${nameColumn.operator}`}
                linkTarget={linkTarget}
                rowWrapper={rowWrapper}
                width={nameColumn.width}
            >
                <PrependWrapper data={capitalizeStatus(dataRecord, nameColumn.operator)} display={nameColumn.display} />
            </CellWrapper>
            <CellWrapper
                key={`table-row-${dataRecord.requestId}-${priorityColumn.operator}`}
                linkTarget={linkTarget}
                rowWrapper={rowWrapper}
                width={priorityColumn.width}
            >
                <PrependWrapper
                    data={capitalizeStatus(dataRecord, priorityColumn.operator)}
                    display={priorityColumn.display}
                />
            </CellWrapper>
            {!currentUserIsTenant && (
                <Components.Column
                    key={`table-row-${dataRecord.requestId}-${toDoListColumns[4].operator}`}
                    width={toDoListColumns[4].width}
                >
                    {pending ? (
                        <FlexWrapper className={styles.ToDoListRowSpinner} justify="center" align="center">
                            <AnimatedIcons.SpinningLoader aspect="1.25rem" />
                        </FlexWrapper>
                    ) : (
                        <IconWithTextWithCallback text="Start Working" Icon={ArrowRightCircle} callBack={startWorking} />
                    )}
                </Components.Column>
            )}
            <RequestSummaryToggle
                toggleSummary={toggleSummary}
                requestId={dataRecord.requestId}
                showSummaryForId={showSummaryForId}
            />
        </Components.Row>
    );
};

