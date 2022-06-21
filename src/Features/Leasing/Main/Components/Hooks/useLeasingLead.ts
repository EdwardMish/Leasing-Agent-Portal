import { LeasingLead } from 'API/Leasing/Types/LeasingLead';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addErrorMessage } from 'State/GlobalMessages/actionCreators';
import { API as LeasingAPI } from 'API/Leasing';

interface useLeasingLeadHook {
    loading: boolean;
    leasingLead?: LeasingLead;
}

function useLeasingLead(leasingLeadId: number): useLeasingLeadHook {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [leasingLead, setLeasingLead] = React.useState<LeasingLead | undefined>(undefined);


    React.useEffect(() => {
        if (!leasingLeadId) throw new Error('A leasing lead id is required to use this hook.');

        if (!loading) {
            setLoading(true);


            if (leasingLead == null || leasingLead.id !== leasingLeadId) {
                LeasingAPI.getLeasingLead(leasingLeadId)
                    .then((leasingLead) => {
                        setLeasingLead(leasingLead);
                        setLoading(false);
                    })
                    .catch(() => {
                        dispatch(addErrorMessage('Unable to retrieve lead details'));
                        setLoading(false);
                    });
            }
        }
    }, [leasingLeadId]);

    return {
        loading,
        leasingLead,
    };
}

export default useLeasingLead;
