import NProgress from 'nprogress';
import { notification } from 'antd';
import { Config } from '@/interface';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axios = Axios.create();

axios.defaults.timeout = 8000;
axios.defaults.headers.common['User-Agent'] = 'yuque-plugin';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

chrome.storage.local.get(['yuqueConfig'], function (values) {
  const config = values as { yuqueConfig: Config };
  axios.defaults.headers.common['X-Auth-Token'] = config.yuqueConfig.yuque.accessToken;
  axios.defaults.baseURL = `https://${config.yuqueConfig.yuque.domain}.yuque.com/api/v2`;
});

NProgress.configure({ showSpinner: false });

let requestCounter = 0;

const Http = async <T>(option: AxiosRequestConfig): Promise<T | null> => {
  !NProgress.isStarted() && NProgress.start();
  requestCounter += 1;

  return await axios(option)
    .then((response: AxiosResponse<T>) => {
      requestCounter === 1 && NProgress.done();
      requestCounter -= 1;
      return response.data;
    })
    .catch(error => {
      console.error(error);
      notification.error({
        message: '请求出错',
        description: '网络繁忙，请稍后再试！'
      });
      return null;
    });
};

export default Http;
