import getIssueCountsByRegion from 'API/Reports/getIssueCountsByRegion';
import * as React from 'react';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { LoadingContent } from '../../../Shared/PageElements';
import { IssueCountByRegion } from '../../../Types';
import { DashCommBranding } from '../../../utils/branding';

export const IssueCountsByRegion: React.FC<{}> = () => {
    const [issueTypes, setIssueTypes] = React.useState<IssueCountByRegion[]>([]);

    React.useEffect(() => {
        getIssueCountsByRegion()
            .then((data) => {
                setIssueTypes(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return issueTypes.length ? (
        <div>
            <h3>Issues By Region</h3>
            <BarChart data={issueTypes} width={800} height={400}>
                <XAxis dataKey="region" />
                <YAxis />
                <Bar dataKey="count" isAnimationActive={false} fill={DashCommBranding.SecondaryColor}>
                    <LabelList dataKey="count" position="inside" />
                </Bar>
            </BarChart>
        </div>
    ) : (
        <LoadingContent />
    );
};

