import { message } from 'antd';
import { StoreKey } from '@/interface';

class ChromeStorage {
  async get<V extends Record<string, string | number | boolean>>(
    storeKey: StoreKey,
    requiredKeys?: string[],
    optionalKeys?: string[]
  ): Promise<{ [K in keyof V]: V[K] } | undefined> {
    return new Promise(function (resolve) {
      chrome.storage.sync.get(function (store) {
        if (!store[storeKey]) {
          void message.error('未找到相关配置，请配置插件后再使用');
          resolve(undefined);
          return;
        }

        if (!requiredKeys && !optionalKeys) {
          resolve(store[storeKey]);
        }

        if (requiredKeys && requiredKeys.length) {
          const passed = requiredKeys.every(key => store[storeKey][key] !== undefined);
          if (passed) {
            resolve(
              requiredKeys
                .concat(optionalKeys || [])
                .reduce((values: V, key: string) => ({ ...values, [key]: store[storeKey][key] }), {} as V)
            );
          } else {
            void message.error('未找到相关配置，请配置插件后再使用');
            resolve(undefined);
          }
          return;
        }

        if (optionalKeys && optionalKeys.length) {
          resolve(
            optionalKeys.reduce((values: V, key: string) => ({ ...values, [key]: store[storeKey][key] }), {} as V)
          );
        }
      });
    });
  }

  async set(storeKey: StoreKey, values: Record<string, string | number | boolean>): Promise<boolean> {
    return new Promise(function (resolve) {
      try {
        chrome.storage.sync.set({ [storeKey]: values }, () => resolve(true));
      } catch (e) {
        console.error(e);
        void message.error('插件配置保存失败');
        resolve(false);
      }
    });
  }

  async remove(storeKey: StoreKey) {
    return new Promise(function (resolve) {
      try {
        chrome.storage.sync.remove(storeKey, () => resolve(true));
      } catch (e) {
        console.error(e);
        void message.error('数据清除失败');
        resolve(false);
      }
    });
  }
}

export default new ChromeStorage();
