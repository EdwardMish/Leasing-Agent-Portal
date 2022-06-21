import { format } from 'date-fns'
import * as React from 'react'
import { useSelector } from 'react-redux'

import { Close, IconColors, Pencil } from '../../../../Icons'

import {
    NoContent,
    SecondaryTitle,
    SecondaryTitleWithAction
} from '../../../../Shared/PageElements'
import { FlexWrapper } from '../../../../Shared/FlexWrapper'
import OccupantMailingAddress from '../../../../Shared/Occupant/OccupantMailingAddress';

import { Business, CurrentUserState } from '../../../../State'

import { UserPermissions } from '../../../../Types'

import { formatCityAndState, formatPhone } from '../../../../utils'

import { EditAddressForm } from '../../EditAddressForm'

import styles = require('../occupant-details.module.css');

interface OccupantDetailsProps {
    occupant: Business.Types.Occupant;
}

const formatCollectionFrequency = (frequency): string => {
    switch (frequency) {
        case 'monthly':
            return 'Monthly'
        case 'annual':
            return 'Annually'
        case 'notRequired':
            return 'Not Required'
        default:
            return 'No Record Found'
    }
}

export const OccupantDetails: React.FC<OccupantDetailsProps> = ({
    occupant,
}) => {

    const canViewSales: boolean = useSelector(CurrentUserState.selectors.currentUserHasPermissionsForOccupant([UserPermissions.ViewSales], occupant.id));
    const canEditAddress: boolean = useSelector(CurrentUserState.selectors.currentUserHasPermissionsForOccupant([UserPermissions.AdministrateBusiness], occupant.id));

    const [editAddress, toggleAddressEdit] = React.useState<boolean>(false)

    const FormattedEdit = () => editAddress
        ? <Close aspect='1.25rem' color={IconColors.BrandBlue} />
        : <Pencil aspect='1.25rem' color={IconColors.BrandBlue} />

    const handleEditToggle = () => {
        toggleAddressEdit(!editAddress)
    }

    const handleEditClose = () => {
        toggleAddressEdit(false)
    }

    return (
        <>
            <div className={styles.TwoColums}>
                <div className={styles.Block}>
                    <SecondaryTitle title='Address' />
                    <p>{occupant.physicalAddress.street1}</p>
                    <p>{occupant.physicalAddress.street2}</p>
                    <p>{formatCityAndState(occupant.physicalAddress)}</p>
                    <p>{occupant.physicalAddress.zipcode}</p>
                    {occupant.phone && <p>{formatPhone(occupant.phone)}</p>}
                </div>
                <div>
                    {
                        canEditAddress
                            ? <SecondaryTitleWithAction
                                title='Mailing Address'
                                action={{ callBack: handleEditToggle }}
                                ActionIcon={FormattedEdit}
                            />
                            : <SecondaryTitle title='Mailing Address' />
                    }
                    {
                        editAddress
                            ? <EditAddressForm
                                address={occupant.mailingAddress}
                                callBack={handleEditClose}
                                occupantId={occupant.id}
                            />
                            :
                            <>
                                {
                                    Object.values(occupant.mailingAddress).some((s: string) => s && !!(s.length))
                                        ? <div style={{ margin: '0 0 1.5rem' }}>
                                            <OccupantMailingAddress mailingAddress={occupant.mailingAddress} />
                                        </div>
                                        : <NoContent message='No Mailing Address Set' />
                                }
                            </>
                    }
                </div>
            </div>
            {
                canViewSales && occupant.collectSalesStartDate &&
                <div className={styles.Block}>
                    <SecondaryTitle title='Sales Submissions' />
                    <FlexWrapper align='center' justify='start'>
                        <p style={{ width: '8rem' }}><b>Sales Start Date:</b></p>
                        <p>{format(new Date(occupant.collectSalesStartDate), 'LL/dd/yy')}</p>
                    </FlexWrapper>
                    <FlexWrapper align='center' justify='start'>
                        <p style={{ width: '8rem' }}><b>Submitted:</b></p>
                        <p>{formatCollectionFrequency(occupant.salesSubmissionFrequency)}</p>
                    </FlexWrapper>
                </div>
            }
            <div className={styles.Block}>
                <SecondaryTitle title='Property Spaces Occupied' />
                {
                    occupant.spaces.map(({ id, name }) => (
                        <FlexWrapper key={`property-spaces-${id}`} align='center' justify='start'>
                            <p>{`Space ${name}`}</p>
                        </FlexWrapper>
                    ))
                }
            </div>
        </>
    )
}