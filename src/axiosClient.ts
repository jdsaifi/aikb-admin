import axios, { AxiosError } from 'axios';

const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3047/api/v1';

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: baseURL,
    withCredentials: true, // send cookies with every request
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // optional: 10 second timeout
});

// Optional: Add global error handling
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        //     console.log('\n\n\n\n');
        //     console.log(
        //         '=================Axiox Client Error DATA================='
        //     );
        //     console.log(error.response.data);
        //     console.log('\n\n\n\n');

        //     console.log('API Error:');
        //     console.log(
        //         util.inspect(
        //             {
        //                 message: error.message,
        //                 url: error.config?.url,
        //                 status: error.response?.status,
        //                 errorData: error.response?.data,
        //             },
        //             { depth: null, colors: true }
        //         )
        //     );

        // Optionally shape the error to a standard format
        const customError = {
            message: error.response?.data?.message || 'Something went wrong',
            status: error.response?.status || 500,
            originalError: error,
            errorData: error.response?.data,
        };

        // throw customError;
        // toast.error(customError.message);

        return Promise.reject(customError); // reject with customError
    }
);

export class CustomAxiosError extends AxiosError {
    // message: string;
    // status: number;
    originalError: any;
    errorData?: any;
}

export default axiosClient;
