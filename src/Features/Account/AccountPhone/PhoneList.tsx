import * as React from 'react';

import { Phone } from '../../../Types/User';
import { PhoneTypeDisplayName } from '../../../Types/User/PhoneType';

import { formatPhone } from '../../../utils';

import { IconColors } from '../../../Icons';

import flexUtils from '../../../Shared/FlexWrapper/utils';

interface PhoneListProps {
    phoneNumbers: Phone[];
}

// const PhoneList: React.FC<PhoneListProps> = ({ phoneNumbers }) => (
//     <ul
//         style={{
//             listStyleType: 'none',
//             margin: '0.75rem 0 1rem',
//             padding: 0,
//         }}
//     >
//         {phoneNumbers
//             .sort((a: Phone, b: Phone) =>
//                 a.phoneType.toString().toLowerCase().localeCompare(
//                     b.phoneType.toString().toLowerCase()
//             )
//             .map(({ phoneNumber, phoneType }) => (
//                 <li
//                     key={`phone-item-${phoneNumber}-${phoneType}`}
//                     style={{
//                         ...flexUtils.flexWrapperStyles({
//                             justify: 'start',
//                             align: 'center',
//                         }),
//                     }}
//                 >
//                     <p
//                         style={{
//                             fontSize: '0.8rem',
//                             margin: 0,
//                             color: IconColors.LightGrey,
//                             width: '4rem',
//                             lineHeight: '1.75rem',
//                         }}
//                     >
//                         {PhoneTypeDisplayName[phoneType]}
//                     </p>
//                     <p
//                         style={{
//                             lineHeight: '1.75rem',
//                         }}
//                     >
//                         {formatPhone(phoneNumber)}
//                     </p>
//                 </li>
//             ))}
//     </ul>
// );

function PhoneList({ phoneNumbers }: PhoneListProps): JSX.Element {
    return (
        <ul
            style={{
                listStyleType: 'none',
                margin: '0.75rem 0 1rem',
                padding: 0,
            }}
        >
            {phoneNumbers
                .sort((a: Phone, b: Phone) =>
                    a.phoneType.toString().toLowerCase().localeCompare(b.phoneType.toString().toLowerCase()),
                )
                .map(({ phoneNumber, phoneType }) => (
                    <li
                        key={`phone-item-${phoneNumber}-${phoneType}`}
                        style={{
                            ...flexUtils.flexWrapperStyles({
                                justify: 'start',
                                align: 'center',
                            }),
                        }}
                    >
                        <p
                            style={{
                                fontSize: '0.8rem',
                                margin: 0,
                                color: IconColors.LightGrey,
                                width: '4rem',
                                lineHeight: '1.75rem',
                            }}
                        >
                            {PhoneTypeDisplayName[phoneType]}
                        </p>
                        <p
                            style={{
                                lineHeight: '1.75rem',
                            }}
                        >
                            {formatPhone(phoneNumber)}
                        </p>
                    </li>
                ))}
        </ul>
    );
}

export default PhoneList;
