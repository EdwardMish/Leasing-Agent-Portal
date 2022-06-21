import { Space } from 'API/Leasing/Types/Space';
import { API as LeasingAPI } from 'API/Leasing';
import { useState } from 'react';

export interface useSinglePropertySpaceSelectionReturn {
    getSpaces: (arg0: number) => Promise<void>;
    spaces: Space[];
    loadingSpaces: boolean;
    errorMessage: string;
    selectedSpaceId?: number;
    selectSpaceId: (spaceId: number) => void;
    visibleSpaces: number[];
    searchSpaces: (searchTerm: string) => void;
}

const useSinglePropertySpaceSelection = (): useSinglePropertySpaceSelectionReturn => {
    // State:
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [loadingSpaces, setLoadingSpaces] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedSpaceId, selectSpaceId] = useState<number>(-1);
    const [visibleSpaces, setVisibleSpaces] = useState<number[]>([]);

    // Methods:

    const getSpaces = async (propertyId: number): Promise<void> => {
        setLoadingSpaces(true);

        try {
            const response = await LeasingAPI.getSpaces(propertyId);
            setSpaces(response);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setLoadingSpaces(false);
        }
    };

    const searchSpaces = (searchTerm: string) => {
        if (!searchTerm) {
            setVisibleSpaces([]);
        }

        const term = searchTerm.toLowerCase();

        const filteredList: number[] = spaces
            .filter((space: Space) => space.name.toLowerCase().includes(term))
            .map((space) => space.id);

        setVisibleSpaces(filteredList);
    };

    return {
        spaces,
        getSpaces,
        loadingSpaces,
        errorMessage,
        selectedSpaceId,
        selectSpaceId,
        visibleSpaces,
        searchSpaces,
    };
};

export default useSinglePropertySpaceSelection;
