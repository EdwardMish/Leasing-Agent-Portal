/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Select, { SelectProps } from './Select';

const StatesValues = [
    { name: 'Alabama', value: 'AL' },
    { name: 'Alaska', value: 'AK' },
    { name: 'Arizona', value: 'AZ' },
    { name: 'Arkansas', value: 'AR' },
    { name: 'California', value: 'CA' },
    { name: 'Canal Zone', value: 'CZ' },
    { name: 'Colorado', value: 'CO' },
    { name: 'Connecticut', value: 'CT' },
    { name: 'Delaware', value: 'DE' },
    { name: 'District of Columbia', value: 'DC' },
    { name: 'Florida', value: 'FL' },
    { name: 'Georgia', value: 'GA' },
    { name: 'Guam', value: 'GU' },
    { name: 'Hawaii', value: 'HI' },
    { name: 'Idaho', value: 'ID' },
    { name: 'Illinois', value: 'IL' },
    { name: 'Indiana', value: 'IN' },
    { name: 'Iowa', value: 'IA' },
    { name: 'Kansas', value: 'KS' },
    { name: 'Kentucky', value: 'KY' },
    { name: 'Louisiana', value: 'LA' },
    { name: 'Maine', value: 'ME' },
    { name: 'Maryland', value: 'MD' },
    { name: 'Massachusetts', value: 'MA' },
    { name: 'Michigan', value: 'MI' },
    { name: 'Minnesota', value: 'MN' },
    { name: 'Mississippi', value: 'MS' },
    { name: 'Missouri', value: 'MO' },
    { name: 'Montana', value: 'MT' },
    { name: 'Nebraska', value: 'NE' },
    { name: 'Nevada', value: 'NV' },
    { name: 'New Hampshire', value: 'NH' },
    { name: 'New Jersey', value: 'NJ' },
    { name: 'New Mexico', value: 'NM' },
    { name: 'New York', value: 'NY' },
    { name: 'North Carolina', value: 'NC' },
    { name: 'North Dakota', value: 'ND' },
    { name: 'Ohio', value: 'OH' },
    { name: 'Oklahoma', value: 'OK' },
    { name: 'Oregon', value: 'OR' },
    { name: 'Pennsylvania', value: 'PA' },
    { name: 'Puerto Rico', value: 'PR' },
    { name: 'Rhode Island', value: 'RI' },
    { name: 'South Carolina', value: 'SC' },
    { name: 'South Dakota', value: 'SD' },
    { name: 'Tennessee', value: 'TN' },
    { name: 'Texas', value: 'TX' },
    { name: 'Utah', value: 'UT' },
    { name: 'Vermont', value: 'VT' },
    { name: 'Virgin Islands', value: 'VI' },
    { name: 'Virginia', value: 'VA' },
    { name: 'Washington', value: 'WA' },
    { name: 'West Virginia', value: 'WV' },
    { name: 'Wisconsin', value: 'WI' },
    { name: 'Wyoming', value: 'WY' },
];

const States = (props: SelectProps): React.ReactElement => {
    const { fullWidth, required, hideLabel } = props;
    return (
        <Select
            {...props}
            style={{
                width: fullWidth ? '100%' : 'auto',
                borderLeft: required && hideLabel ? '2px solid rgb(75,75,75)' : '',
                marginBottom: '1rem',
            }}
        >
            {StatesValues.map((st) => (
                <option key={st.value} value={st.value}>
                    {st.name}
                </option>
            ))}
        </Select>
    );
};

export default States;
