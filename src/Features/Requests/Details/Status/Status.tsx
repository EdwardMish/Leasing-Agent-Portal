import * as React from 'react'
import { useSelector } from 'react-redux'
import { Form, Formik } from 'formik'

import { Requests } from '../../../../State'
import { RequestStatus } from '../../../../Types'

import { SelectInputs } from '../../../../Shared/Forms'

import { StatusFormHandler } from './StatusFormHandler'

interface StatusProps {
    requestId: number;
}

export const Status: React.FC<StatusProps> = ({ requestId }) => {
    const { selectors } = Requests

    const request: Requests.Types.Request = useSelector(selectors.request(requestId))

    return (
        <>
            {
                request && !!request.hasOwnProperty('status')
                    ? <Formik
                        initialValues={{ status: request.status as RequestStatus }}
                        onSubmit={() => { }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <SelectInputs.HorizontalSelect
                                    id='staus'
                                    name='status'
                                    label='Status:'
                                    labelWidth='7rem'
                                    selectWidth='calc(100% - 7rem)'
                                >
                                    <option value={RequestStatus.Open}>Open</option>
                                    <option value={RequestStatus.InProgress}>In Progress</option>
                                    <option value={RequestStatus.OnHold}>On Hold</option>
                                    <option value={RequestStatus.Closed}>Closed</option>
                                </SelectInputs.HorizontalSelect>
                                <StatusFormHandler requestId={requestId} errorCallback={setFieldValue} currentStatus={request.status} />
                            </Form>
                        )}
                    </Formik>
                    : <SelectInputs.HorizontalSelect
                        id='staus'
                        name='status'
                        label='Status:'
                        labelWidth='7rem'
                        selectWidth='calc(100% - 7rem)'
                    >
                        <option value={''}>Loading...</option>
                    </SelectInputs.HorizontalSelect>
            }
        </>
    )
}