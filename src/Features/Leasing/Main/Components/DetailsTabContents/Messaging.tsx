import React from 'react';
import { API as LeasingAPI, Types as LeasingTypes } from 'API/Leasing';
import Messaging from 'Shared/Leasing/Messaging/Messaging';
import { useDispatch } from 'react-redux';
import { globalMessageActionCreators } from 'State';

interface MessagesProps {
    applicationId: number;
    completed: boolean;
}

const Messages = ({ applicationId, completed }: MessagesProps): React.ReactElement => {
    const dispatch = useDispatch();
    const [messageList, setMessageList] = React.useState<LeasingTypes.Message[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const loadMessages = async () => {
        setLoading(true);
        try {
            const messages = await LeasingAPI.getMessages(applicationId);
            setMessageList(messages);
        } catch (err) {
            dispatch(globalMessageActionCreators.addErrorMessage('Unable to load messages', err));
        }

        setLoading(false);
    };

    React.useEffect(() => {
        loadMessages();
    }, []);

    const sendMessage = async (message) => {
        try {
            await LeasingAPI.sendMessage(applicationId, message);
            loadMessages();
        } catch (err) {
            dispatch(globalMessageActionCreators.addErrorMessage('Unable to send messages', err));
        }
    };
    return (
        <Messaging messageList={messageList} isSending={loading} sendMessage={sendMessage} leaseAppCompleted={completed} />
    );
};

export default Messages;
