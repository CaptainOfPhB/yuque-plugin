import { message, notification } from 'antd';

async function wrappedFetch<T>(input: RequestInfo, init?: RequestInit) {
  let loading = true;

  setTimeout(() => {
    if (loading) {
      void message.loading({ duration: 0, key: 'loading', content: '正在加载，请稍候...' });
    }
  }, 300);

  return fetch(input, init)
    .then(async r => r.json())
    .then<T>(response => response)
    .catch((error: Error) => {
      notification.error({ message: 'Request Error:', description: error.message });
      return null;
    })
    .finally(() => {
      loading = false;
      message.destroy('loading');
    });
}

export default wrappedFetch;
