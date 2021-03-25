import Http from '@/http';

export const getUser = async <T>() => Http<T>({ url: '/user' });
