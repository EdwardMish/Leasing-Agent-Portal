import getIssueCountsByType from 'API/Reports/getIssueCountsByType';
import * as React from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { LoadingContent } from '../../../Shared/PageElements';
import { IssueTypesByCount } from '../../../Types';
import { colors } from '../../../utils';

function camelCaseToWords(str: string) {
    return (str.match(/^[a-z]+|[A-Z][a-z]*/g) || [])
        .map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase())
        .join(' ');
}

export const IssueCountsByType: React.FC<{}> = () => {
    const [issueTypes, setIssueTypes] = React.useState<IssueTypesByCount[]>([]);
    const [issueTypeKeys, setIssueTypeKeys] = React.useState<string[]>([]);

    React.useEffect(() => {
        getIssueCountsByType()
            .then((data) => {
                setIssueTypes(data);
                setIssueTypeKeys(Object.keys(data[0]).filter((key) => key !== 'period'));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return issueTypes.length ? (
        <div>
            <h3>Issues By Type</h3>
            <BarChart data={issueTypes} width={800} height={400}>
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend
                    payload={issueTypeKeys.map((key, index) => ({
                        value: camelCaseToWords(key),
                        type: 'rect',
                        id: key,
                        color: colors[index].hex,
                    }))}
                />
                {issueTypeKeys.map((key, index) => (
                    <Bar key={key} dataKey={key} isAnimationActive={false} fill={colors[index].hex} stackId="group" />
                ))}
            </BarChart>
        </div>
    ) : (
        <LoadingContent />
    );
};

