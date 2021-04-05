import { PublicEnumeration } from '@/interface';

export interface ParamsOfCreateDoc {
  body: string;
  title: string;
  namespace: string;
  public: PublicEnumeration;
}
