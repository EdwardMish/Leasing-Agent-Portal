import { useState } from 'react';
import { API as LeasingAPI } from 'API/Leasing';
import { ApplicantPersonalLeaseApplication } from 'API/Leasing/Types/ApplicantPersonalLeaseApplication';

export interface usePersonalApplicationStateReturn {
    loadingApplication: boolean;
    errorMessage: string;
    application: any; // TODO: Assing the right type
    getPersonalLeaseApplicationForApplicant: (number) => Promise<void>;
}

const usePersonalApplicationState = (): usePersonalApplicationStateReturn => {
    const [application, setApplication] = useState<ApplicantPersonalLeaseApplication>();
    const [loadingApplication, setLoadingApplication] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getPersonalLeaseApplicationForApplicant = async (applicationId): Promise<void> => {
        if (applicationId) {
            try {
                setLoadingApplication(true);
                const app = await LeasingAPI.getPersonalLeaseApplicationForApplicant(applicationId);
                setApplication(app);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage(error.message);
                throw error;
            } finally {
                setLoadingApplication(false);
            }
        }
    };

    return {
        loadingApplication,
        errorMessage,
        application,
        getPersonalLeaseApplicationForApplicant,
    };
};

export default usePersonalApplicationState;
