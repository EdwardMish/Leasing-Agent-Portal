import { API as LeasingAPI } from 'API/Leasing';
import { Liability } from 'API/Leasing/Types/Liability';
import { AccountType } from 'Features/Leasing/Application/Types/AccountType';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import selectors from 'State/Leasing/selectors';
import { LeasingApplication } from 'State/Leasing/Types';
import { unformatNumber, convertURLBlobToFile } from 'utils';

export interface useLiabilitiesStateReturn {
    getLiabilities: () => Promise<void>;
    liabilities: Liability[];
    totalAmount: number;
    loadingLiabilities: boolean;
    createLiability: (any) => Promise<void>;
    creatingLiability: boolean;
    deleteLiability: (number) => Promise<void>;
    deletingLiability: boolean;
    completingLiabilities: boolean;
    completeLiabilities: () => Promise<void>;
    errorMessage: string;
}

const useLiabilitiesState = (): useLiabilitiesStateReturn => {
    const [liabilities, setLiabilities] = useState<Liability[]>([]);
    const [loadingLiabilities, setLoadingLiabilities] = useState(false);
    const [creatingLiability, setCreatingLiability] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [deletingLiability, setDeletingLiability] = useState(false);
    const [completingLiabilities, setCompletingLiabilities] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const activeApplication: LeasingApplication | undefined = useSelector(selectors.leasingApplication);

    const getLiabilities = async (): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to retrive liabilities with an undefined application');

        try {
            setLoadingLiabilities(true);
            const response = await LeasingAPI.getLiabilities(activeApplication?.id);
            const total = response.reduce((sum, currentLiability) => sum + currentLiability.amount, 0);
            setLiabilities(response);
            setTotalAmount(total);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setLoadingLiabilities(false);
        }
    };

    const formatLiabilityData = async (values): Promise<Liability> => {
        const attachments = await Promise.all<File>(values.attachment.map((att) => convertURLBlobToFile(att)));
        const liabilityData: Liability = {
            nickName: values.nickname,
            amount: unformatNumber(values.liabilityAmount) * 100,
            jointOwnersName: values?.accountCoOwner,
            type: values.liabilityType,
            isJoint: values.accountType === AccountType.Joint,
            otherTypeName: values?.otherLiabilityName,
            attachments,
        };

        return liabilityData;
    };

    const createLiability = async (values): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to create new liability with an undefined application');

        try {
            setCreatingLiability(true);
            const liabilityData = await formatLiabilityData(values);
            await LeasingAPI.createLiability(activeApplication?.id, liabilityData);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error);
            throw error;
        } finally {
            setCreatingLiability(false);
        }
    };

    const deleteLiability = async (liability: Liability): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to delete the liability with an undefined application');

        try {
            setDeletingLiability(true);
            await LeasingAPI.deleteLiability(activeApplication?.id, liability);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setDeletingLiability(false);
        }
    };

    const completeLiabilities = async (): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to complete the liabilities with an undefined application');

        try {
            setCompletingLiabilities(true);
            await LeasingAPI.completePersonalApplicationLiabilities(activeApplication?.id);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setCompletingLiabilities(false);
        }
    };

    return {
        getLiabilities,
        liabilities,
        totalAmount,
        loadingLiabilities,
        createLiability,
        creatingLiability,
        deleteLiability,
        deletingLiability,
        completeLiabilities,
        completingLiabilities,
        errorMessage,
    };
};

export default useLiabilitiesState;
