import request from '@/utils/axios';

interface IResponseType<P = Record<string, any>> {
    code?: number;
    status: number;
    msg: string;
    data: P;
}
interface ILogin {
    token: string;
    expires: number;
}

interface IUser {
    username: string;
}

const getUser = () => {
    return request<IResponseType<IUser>>({
        url: '/api/user',
        method: 'get',
    });
};

export { getUser };