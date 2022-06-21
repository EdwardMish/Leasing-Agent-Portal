export enum IdentificationTypes {
    Passport = 'passport',
    StateIdentification = 'stateIdentification',
}

export const IdentificationTypeDisplayName = {
    [IdentificationTypes.Passport]: 'Passport',
    [IdentificationTypes.StateIdentification]: 'State Identification',
};

export default { IdentificationTypes };
