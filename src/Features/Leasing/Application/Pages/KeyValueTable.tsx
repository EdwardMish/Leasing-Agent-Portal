import React from 'react';

interface KeyValueTableProps {
    keyValueObject: Record<string, any>;
    tableStyle?: Record<string, string>;
    keyStyle?: Record<string, string>;
    valueStyle?: Record<string, string>;
}

const KeyValueTable = ({ keyValueObject, tableStyle, keyStyle, valueStyle }: KeyValueTableProps): React.ReactElement => {
    if (!keyValueObject) return <p>Not Available Data</p>;

    return (
        <table style={tableStyle}>
            <tbody>
                {Object.keys(keyValueObject).map((key) => (
                    <tr key={key}>
                        <td style={keyStyle}>{key}:</td>
                        <td style={valueStyle}>{keyValueObject[key]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default KeyValueTable;
