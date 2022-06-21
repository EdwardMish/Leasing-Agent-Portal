import { API as LeasingAPI } from 'API/Leasing';
import { Asset } from 'API/Leasing/Types/Asset';
import { AccountType } from 'Features/Leasing/Application/Types/AccountType';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import selectors from 'State/Leasing/selectors';
import { LeasingApplication } from 'State/Leasing/Types';
import { convertURLBlobToFile, unformatNumber, multiply } from 'utils';

export interface useAssetStateReturn {
    getAssets: () => Promise<void>;
    assets: Asset[];
    totalAmount: number;
    loadingAssets: boolean;
    createAsset: (any) => Promise<void>;
    creatingAsset: boolean;
    isModalShown: boolean;
    setIsModalShown: any;
    deleteAsset: (number) => Promise<void>;
    deletingAsset: boolean;
    errorMessage: string;
    completingAssets: boolean;
    completeAssets: () => Promise<void>;
}

const useAssetState = (): useAssetStateReturn => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loadingAssets, setLoadingAssets] = useState(false);
    const [creatingAsset, setCreatingAsset] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isModalShown, setIsModalShown] = useState(false);
    const [deletingAsset, setDeletingAsset] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [completingAssets, setCompletingAssets] = useState(false);

    const activeApplication: LeasingApplication | undefined = useSelector(selectors.leasingApplication);

    const getAssets = async (): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to retrive assets with an undefined application');

        setLoadingAssets(true);
        try {
            const response = await LeasingAPI.getAssets(activeApplication?.id);
            const total = response.reduce((sum, currentAsset) => sum + currentAsset.amount, 0);
            setAssets(response);
            setTotalAmount(total);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setLoadingAssets(false);
        }
    };

    const formatAssetData = async (values): Promise<Asset> => {
        const attachments = await Promise.all<File>(values.attachment.map((att) => convertURLBlobToFile(att)));
        const assetData: Asset = {
            nickName: values.nickname,
            amount: multiply(unformatNumber(values.assetAmount), 100),
            jointOwnersName: values?.accountCoOwner,
            type: values.assetType,
            isJoint: values.accountType === AccountType.Joint,
            otherTypeName: values?.otherAssetName,
            attachments,
        };

        return assetData;
    };

    const createAsset = async (values): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to create new asset with an undefined application');

        try {
            setCreatingAsset(true);
            const assetData = await formatAssetData(values);
            await LeasingAPI.createAsset(activeApplication?.id, assetData);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setCreatingAsset(false);
        }
    };

    const deleteAsset = async (asset: Asset): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to delete the asset with an undefined application');

        try {
            setDeletingAsset(true);
            await LeasingAPI.deleteAsset(activeApplication?.id, asset);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setDeletingAsset(false);
        }
    };

    const completeAssets = async (): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to complete the assets with an undefined application');

        try {
            setCompletingAssets(true);
            await LeasingAPI.completePersonalApplicationAssets(activeApplication?.id);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setCompletingAssets(false);
        }
    };

    return {
        getAssets,
        assets,
        totalAmount,
        loadingAssets,
        createAsset,
        creatingAsset,
        isModalShown,
        setIsModalShown,
        deleteAsset,
        deletingAsset,
        errorMessage,
        completingAssets,
        completeAssets,
    };
};

export default useAssetState;
