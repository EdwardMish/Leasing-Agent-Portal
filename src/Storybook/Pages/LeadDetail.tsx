import * as React from 'react';

import { Add } from '../../Icons';
import { IconWithText } from '../../Shared/PageElements';
import Description from '../../Shared/PageElements/Description';
import Title from '../../Shared/PageElements/Title';
import { loremIpsum } from '../../Shared/Forms/Mock/loremIpsum';
import Divider from '../../Shared/PageElements/Divider';

import styles from './prospective-tenant.module.css';
import itemStyles from '../../Features/Communications/News/List/news-list.module.css';

interface LeadDetailProps {}

const LeadDetail: React.FC<LeadDetailProps> = () => {
    const guarantors = [
        { name: 'Fred Tenant', email: 'fredT@email.com' },
        { name: 'guarantor #2', email: 'email2@email.com' },
    ];
    return (
        <div className={styles.PageWrapper}>
            <main className={styles.PageStyles}>
                <Title title="Lead Detail" />
                <div className={styles.LoremIpsumWrapper}>
                    <Description>{loremIpsum}</Description>
                </div>
                <Divider />
                <div className={itemStyles.NewsList}>
                    {guarantors.map((guarantor) => (
                        <div className={itemStyles.NewsListItem} style={{ boxSizing: 'border-box' }}>
                            <a>
                                <p style={{ color: '#0071ce' }}>{guarantor.name}</p>
                                <p>{guarantor.email}</p>
                            </a>
                        </div>
                    ))}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            margin: '1rem 0',
                        }}
                    >
                        <IconWithText text="Add Guarantor" Icon={Add} iconAspect={'1.5rem'} iconOnLeft />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LeadDetail;

