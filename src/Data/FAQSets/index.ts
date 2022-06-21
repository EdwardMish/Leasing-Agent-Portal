import commonAreaMaintenance from './commonAreaMaintenanceFAQs';
import dashcommSupport from './dashcommSupportFAQs';
import marketing from './marketingFAQs';
import myAccount from './myAccountFAQs';
import newTenant from './newTenantFAQs';

const faqs = [
    {
        ...dashcommSupport,
        index: 'dashcommSupport',
    },
    {
        ...myAccount,
        index: 'myAccount',
    },
    {
        ...commonAreaMaintenance,
        index: 'commonAreaMaintenance',
    },
    {
        ...marketing,
        index: 'marketing',
    },
    {
        ...newTenant,
        index: 'newTenant',
    },
];

export default faqs;
