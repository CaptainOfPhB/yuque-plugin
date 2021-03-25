import { YuqueConfig } from '@/interface';
import { message, notification } from 'antd';
import { MessageMapping, ResponseWithError } from '@/http/interface';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axios = Axios.create();

axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(async function (config: AxiosRequestConfig) {
  return new Promise(function (resolve) {
    chrome.storage.sync.get(['yuqueConfig'], function (values) {
      const store = values as { yuqueConfig: YuqueConfig };
      config.headers['X-Auth-Token'] = store.yuqueConfig.accessToken;
      config.url = `https://${store.yuqueConfig.domain}.yuque.com/api/v2` + config.url;
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
  return null;
});

const Http = async <T>(option: AxiosRequestConfig): Promise<T | null> => {
  void message.loading({ duration: 0, key: 'loading', content: '正在加载，请稍候...' });
  return await axios(option)
    .then((response: AxiosResponse<T>) => response.data)
    .finally(() => message.destroy('loading'));
};

export default Http;
