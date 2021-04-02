import request from '@/request';
import fetch from '@/request/fetch';
import { BookSerializer, DocSerializer, PhotoSerializer, TocSerializer, UserSerializer } from '@/interface';

export const getUser = async () => {
  return request<UserSerializer>('/user');
};

export const getBooksBy = async (userId: number) => {
  return request<BookSerializer[]>(`/users/${userId}/repos`);
};

export const getTocOfBookBy = async (namespace: string) => {
  return request<TocSerializer[]>(`/repos/${namespace}/toc?depth=2`);
};

export const getDocsOfBookBy = async (namespace: string) => {
  return request<DocSerializer[]>(`/repos/${namespace}/docs`);
};

export const getDocOfBookBy = async (namespace: string, slug: string) => {
  return request<DocSerializer>(`/repos/${namespace}/docs/${slug}`);
};

export const getUnsplashAccessKey = async () => {
  return fetch<{ accessKey: string }>('https://unsplash.deno.dev');
};

export const getRandomPhoto = async (accessKey: string) => {
  return fetch<PhotoSerializer>(`https://api.unsplash.com/photos/random?client_id=${accessKey}&w=800&h=400`);
};
