import request from '@/request';

export const getUser = async <T>() => request<T>('/user');

export const getBooks = async <T>(userId: number) => request<T>(`/users/${userId}/repos`);

export const getTOC = async <T>(namespace: string) => request<T>(`/repos/${namespace}/toc?depth=2`);

export const getDocs = async <T>(namespace: string) => request<T>(`/repos/${namespace}/docs`);

export const getDoc = async <T>(namespace: string, slug: string) => request<T>(`/repos/${namespace}/docs/${slug}`);
