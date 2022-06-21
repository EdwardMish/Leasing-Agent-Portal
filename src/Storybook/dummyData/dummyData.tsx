export const assetList = [
    {
        nickname: 'Personal Checking',
        type: 'Cash',
        value: '$19,000',
        accountType: 'Joint Account',
        joiner: 'w/ Spouse',
        uploads: ['Bank Statement.pdf', 'Spouse Bank Account.jpeg'],
    },
    {
        nickname: 'Savings Account',
        type: 'IRA',
        value: '$120,000',
        accountType: 'Individual Account',
        joiner: '',
        uploads: ['IRA Statement.pdf'],
    },
    {
        nickname: 'Apple Shares',
        type: 'Stock portfolio',
        value: '$500,000',
        accountType: 'Individual Account',
        joiner: '',
        uploads: ['stockportfolio.pdf'],
    }
];

export const liabilitiesList = [
    {
        nickname: 'Liability One',
        type: 'Credit Card',
        otherName: '',
        value: '$19,000',
        accountType: 'Shared Account',
        joiner: 'w/ Spouse',
        uploads: ['creditcardstatement.pdf'],
    },
    {
        nickname: 'Liability Two',
        type: 'Loan',
        otherName: '',
        value: '$120,000',
        accountType: 'Individual Account',
        joiner: '',
        uploads: ['loanDoc1.pdf', 'loanDoc2.pdf'],
    },
    {
        nickname: 'Liability Three',
        type: '',
        otherName: 'Student Debt',
        value: '$120,000',
        accountType: 'Individual Account',
        joiner: '',
        uploads: [],
    },
];

export const documentList = [
    {
        title: 'Last Years Tax Returns',
        uploads: ['2021taxreturn.pdf']
    },
    {
        title: 'Venmo history',
        uploads: ['venmo2020.pdf', 'venmo2021.jpeg']
    },
];

export const questionList = [
    {
        question: 'Do you have any extra cash stored in your mattress?',
        answer: 'Not anymore. Thieves stole my mattress and cash. It was really awful, but I shouldnt have left my front door open',
    },
    {
        question:
            'I thought you mentioned you had a shared bank account but I only see you listed in the assets you uploaded. Just to double check, is this in fact a solo checking account?',
        answer: 'Correct',
    },
    {
        question:
            'One more question for ya and this is it?',
        answer: 'I have this as an answer',
    },
];

export const leasingAgentQuestion =
    'I thought you mentioned you had a shared bank account but I only see you listed in the assets you uploaded. Just to double check, is this in fact a solo checking account?';

export const customDocumentHeader = 'Your Leasing Agent has required that you upload your paypal account balance';

export const liabilityMessageList = [
    {
        date: 'Wednesday, March 23, 2022',
        messages: [
            {
                user: true,
                userName: 'Fred Tom',
                title: 'Dominoes Pizza Guarantor',
                time: '1:29pm',
                text: 'Do student loans count as a liability?',
            },
            { user: false, userName: 'Tom Fred', title: 'Leasing Agent', time: '1:29pm', text: 'They do.' },
        ],
    },
    {
        date: 'Saturday, March 26, 2022',
        messages: [
            {
                user: true,
                userName: 'Fred Tom',
                title: 'Dominoes Pizza Guarantor',
                date: 'March 28, 2022',
                time: '1:29pm',
                text: 'This is a long message to test the scroll window and tex-wrap features because sometimes people will write long messages despite the fact that most people dont really read long messages and instead just the first or last line so when your question is answered it isnt totally answered and its frustrating because you have to ask it again and that can be awkward.',
            },
        ],
    },
    {
        date: 'Monday, March 28, 2022',
        messages: [
            {
                user: false,
                userName: 'Tom Fred',
                title: 'Leasing Agent',
                
                time: '1:29pm',
                text: 'And here is a long response just to see how things go on this side. fingers crossed!',
            },
        ],
    },
];

export const PersonalData = [
    {
        key: 'Phone Number',
        value: '555-555-5555',
    },
    {
        key: 'Date Of Birth',
        value: '01/01/1900',
    },
    {
        key: 'Social Security Number',
        value: '111-11-1111',
    },
];

export const Identification = [
    {
        key: 'ID Type',
        value: 'State ID',
    },
    {
        key: 'ID Number',
        value: '1111111',
    },
    {
        key: 'State',
        value: 'Oregon',
    },
    {
        key: 'Expiration',
        value: '02/03/2022',
    },
];

export const Address = [
    {
        key: 'Address 1',
        value: '742 Evergreen Terrace',
    },
    {
        key: 'Address 2',
        value: 'N/A',
    },
    {
        key: 'City',
        value: 'Springfield',
    },
];

export const Address2 = [
    {
        key: 'State',
        value: 'Oregon',
    },
    {
        key: 'Zip Code',
        value: '97211',
    },
];

export const DummyAddress = {
    AddressOne: '742 Evergreen Terrace',
    AddressTwo: 'N/A',
    City: 'Springfield',
    State: 'Oregon',
    Zipcode: '97211',
};

export const dummyNewTenantData = {
    personalData: {
        name: 'Homer Simpson',
        phoneNumber: '555-555-5555',
        dateOfBirth: '01/01/1900',
        socialSecurityNumber: '111-11-1111',
    },
    identification: {
        idType: 'State ID',
        idNumber: '11111111',
        stateOfOrigin: 'Oregon',
        expiration: '02/02/2022',
    },
    Address: {
        AddressOne: '742 Evergreen Terrace',
        AddressTwo: 'N/A',
        City: 'Springfield',
        State: 'Oregon',
        Zipcode: '97211',
    },
};

export const leadnames = [
    {
        name: 'example business',
        dateCreated: '01/01/2022',
        lastInteraction: '12 days ago',
    },
    {
        name: 'not real',
        dateCreated: '01/01/2022',
        lastInteraction: '10 days ago',
    },
    {
        name: 'fred meyer',
        dateCreated: '01/01/2022',
        lastInteraction: '9 days ago',
    },
    {
        name: 'starbucks',
        dateCreated: '01/01/2022',
        lastInteraction: '9 days ago',
    },
    {
        name: 'burgerville',
        dateCreated: '01/01/2022',
        lastInteraction: '7 days ago',
    },
    {
        name: 'jc penny',
        dateCreated: '01/01/2022',
        lastInteraction: '3 days ago',
    },
    {
        name: 'another starbucks',
        dateCreated: '01/01/2022',
        lastInteraction: '2 days ago',
    },
];

export const UserViewDetails = [
    { label: 'View Assets', number: '$456,000 total', link: 'View Assets' },
    { label: 'View Liabilities', number: '$123,000 total', link: 'View Liabilities' },
    { label: 'View Documents', number: '2 total', link: '' },
    { label: 'View Questions', number: '0 total', link: '' },
    { label: 'View Messages', number: '1 New', link: 'View Credit Test' },
];

export const UserCreditReport = {
    label: 'Credit Report',
    number: '123',
    link: 'View Credit Test',
};

export const UserDetails = [
    { label: 'Credit Score', number: '123' },
    { label: 'Total Assets', number: '$456,000' },
    { label: 'Total Liabilities', number: '$123,000' },
    { label: 'Net Worth', number: '$343,000' },
];

