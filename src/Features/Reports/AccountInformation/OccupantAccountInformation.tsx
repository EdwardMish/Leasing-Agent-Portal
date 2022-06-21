import getAccountInformation from 'API/Reports/getAccountInformation';
import * as React from 'react';
import { Cell, Label, Pie, PieChart } from 'recharts';
import { LoadingContent } from '../../../Shared/PageElements';
import { AccountInformation } from '../../../Types';
import { DashCommBranding } from '../../../utils/branding';

import styles = require('./index.module.css');

export default (): React.ReactElement => {
    const [accountInformation, setAccountInformation] = React.useState<AccountInformation>();

    React.useEffect(() => {
        getAccountInformation().then((data) => {
            setAccountInformation(data);
        });
    }, []);

    const occupantAccounts = accountInformation
        ? [
              {
                  name: 'Without Accounts',
                  value: accountInformation.totalActiveOccupants - accountInformation.totalActiveOccupantsWithAccounts,
              },
              {
                  name: 'With Accounts',
                  value: accountInformation.totalActiveOccupantsWithAccounts,
              },
          ]
        : [];

    const accountsAccessed = accountInformation
        ? [
              {
                  name: 'Not Logged In',
                  value:
                      accountInformation.totalActiveOccupantsWithAccounts - accountInformation.totalOccupantActiveAccounts,
              },
              {
                  name: 'Logged In',
                  value: accountInformation.totalOccupantActiveAccounts,
              },
          ]
        : [];

    return accountInformation ? (
        <div>
            <h3>Account Information</h3>
            <PieChart width={300} height={300} className={`${styles.Pie} ${styles.OccupantAccounts}`}>
                <Pie
                    data={occupantAccounts}
                    dataKey="value"
                    label={(entry) => `${entry.name} (${entry.value})`}
                    cx={150}
                    cy={150}
                    innerRadius={60}
                    outerRadius={90}
                    fontSize=".75rem"
                >
                    <Label value="Tenant Accounts" position="centerTop" />
                    {occupantAccounts.map((entry) => (
                        <Cell
                            key={`label-key-${entry.name}`}
                            fill={
                                entry.name === 'With Accounts'
                                    ? DashCommBranding.PrimaryColor
                                    : DashCommBranding.SecondaryColor
                            }
                        />
                    ))}
                </Pie>
            </PieChart>
            <PieChart width={300} height={300} className={`${styles.Pie} ${styles.AccountsAccessed}`}>
                <Pie
                    data={accountsAccessed}
                    dataKey="value"
                    label={(entry) => `${entry.name} (${entry.value})`}
                    cx={150}
                    cy={150}
                    innerRadius={60}
                    outerRadius={90}
                    fontSize=".75rem"
                >
                    <Label value="Account Access" position="centerTop" />
                    {accountsAccessed.map((entry) => (
                        <Cell
                            key={`cell-key-${entry.name}`}
                            fill={
                                entry.name === 'Logged In' ? DashCommBranding.PrimaryColor : DashCommBranding.SecondaryColor
                            }
                        />
                    ))}
                </Pie>
            </PieChart>
        </div>
    ) : (
        <LoadingContent />
    );
};

