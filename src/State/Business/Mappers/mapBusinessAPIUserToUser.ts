import { Business } from '../../../API'

import { BusinessUser } from '../Types/BusinessUser'

export const mapBusinessAPIUserToUser = ({
    firstName,
    lastName,
    id,
    permissions,
    email,
    businessPhone,
    mobilePhone,
    roles,
}: Business.Types.BusinessUser): BusinessUser => ({
    firstName,
    lastName,
    id,
    permissions,
    email,
    businessPhone,
    mobilePhone,
    roles,
})