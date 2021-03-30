import Http from '@/http';

export const getUser = async <T>() => Http<T>({ url: '/user' });

export const getRepos = async <T>(userId: number) => Http<T>({ url: `/users/${userId}/repos` });

export const getTocUnderRepo = async <T>(namespace: string) => Http<T>({ url: `/repos/${namespace}/toc?depth=2` });
