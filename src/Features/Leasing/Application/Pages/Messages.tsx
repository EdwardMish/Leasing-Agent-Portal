import React from 'react';
import { API as LeasingAPI, Types as LeasingTypes } from 'API/Leasing';
import Messaging from 'Shared/Leasing/Messaging/Messaging';
import { useDispatch } from 'react-redux';
import { globalMessageActionCreators } from 'State';

interface MessagesProps {
    applicationId: number;
}

const Messages = ({ applicationId }: MessagesProps): React.ReactElement => {
    const dispatch = useDispatch();
    const [messageList, setMessageList] = React.useState<LeasingTypes.Message[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const loadMessages = async () => {
        setLoading(true);
        const messages = await LeasingAPI.getMessages(applicationId);
        setMessageList(messages);
        setLoading(false);
    };
    React.useEffect(() => {
        loadMessages();
    }, []);

    const sendMessage = (message) => {
        LeasingAPI.sendMessage(applicationId, message)
            .then(() => {
                loadMessages();
            })
            .catch((err) => dispatch(globalMessageActionCreators.addErrorMessage('Unable to send messages', err)));
    };

    return <Messaging messageList={messageList} isSending={loading} sendMessage={sendMessage} />;
};

export default Messages;

