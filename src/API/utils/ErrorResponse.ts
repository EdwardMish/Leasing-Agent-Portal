import { AxiosError } from 'axios';

class ErrorResponse {
    readonly message: string

    readonly additionalInfo?: string

    readonly code: number

    readonly errorList?: any // eventually give this a type

    public constructor(error: AxiosError) {
        if (!error.response) {
            this.message = 'Something went wrong';
        } else {
            this.code = error.response.status;

            if (Array.isArray(error.response.data)) {
                this.errorList = error.response.data;
                this.message = error.response.data[0].error;
            } else {
                this.message = error.response.data.Message;
            }
        }
    }
}

export default ErrorResponse;
