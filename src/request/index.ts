import { YuqueConfig } from '@/interface';
import { message, notification } from 'antd';
import isAbsoluteURL from '@/helper/isAbsoluteURL';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MessageMapping, Response, ResponseWithError } from '@/request/interface';

const axios = Axios.create();

axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(async function (config: AxiosRequestConfig) {
  return new Promise(function (resolve) {
    chrome.storage.sync.get(['yuqueConfig'], function (values) {
      const store = values as { yuqueConfig: YuqueConfig };
      config.headers['X-Auth-Token'] = store.yuqueConfig.accessToken;
      config.url = isAbsoluteURL(config.url) ? config.url : 'https://www.yuque.com/api/v2'.concat(config.url || '');
      resolve(config);
    });
  });
});

axios.interceptors.response.use(undefined, function (error: AxiosError<ResponseWithError>) {
  if (error.response!.status !== 200) {
    const description = MessageMapping[error.response!.status] || '请打开控制台查看出错原因！';
    notification.error({ message: 'Request Error:', description });
    console.error((error.response!.data as ResponseWithError).message);
  }
  return error;
});

const request = async <T>(option: AxiosRequestConfig | string): Promise<[false, T] | [true, string]> => {
  void message.loading({ duration: 0, key: 'loading', content: '正在加载，请稍候...' });
  const normalizedOption = typeof option === 'string' ? { url: option } : option;
  return await axios(normalizedOption)
    .then((responseOrError: AxiosResponse<Response<T>> | AxiosError<ResponseWithError>) =>
      'data' in responseOrError
        ? ([false, responseOrError.data.data] as [false, T])
        : ([true, responseOrError.response!.data.message] as [true, string])
    )
    .finally(() => message.destroy('loading'));
};

export default request;
