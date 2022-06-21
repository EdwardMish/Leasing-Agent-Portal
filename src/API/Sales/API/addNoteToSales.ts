import POST from 'API/utils/POST';

const addNoteToSales = (occupantId: number | string, year: number, month: number | string, text: string): Promise<void> =>
    POST.wrapper(`${API_ROOT}/occupants/${occupantId}/sales/${year}/${month}/comments`, { text });

export default addNoteToSales;
