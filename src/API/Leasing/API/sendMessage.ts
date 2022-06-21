import POST from '../../utils/POST';

interface ResponseType {
    MessageId: number;
}

const sendMessage = async (leaseApplicationId: number, message: string): Promise<ResponseType> =>
    POST.postFormData<Object, ResponseType>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/messages`, {
        message,
    });

export default sendMessage;
