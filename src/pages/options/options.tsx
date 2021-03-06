import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Skeleton,
  FormInstance,
  notification,
  message,
  Select
} from 'antd';
import {
  Type,
  TypeDescription,
  UserSerializer,
  YuqueConfig,
  BasicConfig,
  MenuConfig,
  YuqueFormFieldsValue,
  BasicFormFieldsValue,
  MenuFormFieldsValue
} from '@/interface';
import React from 'react';
import store from '@/store';
import music from '@/config/music';
import { getUser } from '@/service';
import { CheckOutlined } from '@ant-design/icons';

import './options.less';

interface OptionsPageState {
  loading: boolean;
  user: UserSerializer | undefined;
  menuConfig: MenuConfig | undefined;
  yuqueConfig: YuqueConfig | undefined;
  basicConfig: BasicConfig | undefined;
}

const cls = (s: string) => `yuque-plugin__${s}`;

class Options extends React.Component<unknown, OptionsPageState> {
  yuqueForm = React.createRef<FormInstance<YuqueFormFieldsValue>>();
  basicForm = React.createRef<FormInstance<BasicFormFieldsValue>>();
  menuForm = React.createRef<FormInstance<MenuFormFieldsValue>>();

  state: OptionsPageState = {
    loading: false,
    user: undefined,
    menuConfig: undefined,
    yuqueConfig: undefined,
    basicConfig: undefined
  };

  componentDidMount() {
    this.setState({ loading: true });
    chrome.storage.sync.get(store => {
      this.setState(
        {
          user: store.user,
          menuConfig: store.menuConfig,
          yuqueConfig: store.yuqueConfig,
          basicConfig: store.basicConfig
        },
        () => this.setState({ loading: false })
      );
    });
  }

  onFormFinish = async (formName: string, { values }: { values: YuqueFormFieldsValue }) => {
    switch (formName) {
      case 'yuque':
        {
          const success1 = await store.set('yuqueConfig', values);
          if (!success1) return this.settle(!success1);

          const user = await getUser();
          if (!user) {
            return this.settle(!(await store.set('yuqueConfig', this.state.yuqueConfig!)));
          }

          this.yuqueForm.current?.setFieldsValue({ userName: user.name });

          const success2 = await store.set('user', user);
          if (!success2) return this.settle(!success2);

          this.settle(
            success2,
            this.state.user && this.state.user.id !== user.id
              ? 'Access Token ?????????????????????????????????????????????????????????????????????????????????'
              : undefined
          );
        }
        break;
      case 'basic':
        this.settle(await store.set('basicConfig', values));
        break;
      case 'menu':
        this.settle(await store.set('menuConfig', values));
        break;
    }
  };

  settle = (success: boolean, description?: string) => {
    success ? notification.success({ description, message: '??????????????????' }) : void message.error('??????????????????');
  };

  render() {
    return (
      <div className={cls('options-container')}>
        {this.renderHeader()}
        <div className={cls('form-container')}>
          <Skeleton active={true} loading={this.state.loading} title={false} paragraph={{ rows: 20 }}>
            <Form.Provider onFormFinish={this.onFormFinish}>
              {this.renderYuqueCard()}
              {this.renderBasicCard()}
              {this.renderMenuCard()}
            </Form.Provider>
          </Skeleton>
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  renderHeader = () => {
    return (
      <div className={cls('title-container')}>
        <div className={cls('icon')}>
          <img src='../../images/yuque_128.png' alt='yuque logo' />
          <span>Yuque plugin</span>
        </div>
        <div className={cls('slug')}>Make Yuque more powerful.</div>
      </div>
    );
  };

  renderYuqueCard = () => {
    const { yuqueConfig, user } = this.state;

    return (
      <Form<YuqueFormFieldsValue>
        name='yuque'
        layout='vertical'
        ref={this.yuqueForm}
        initialValues={{ ...yuqueConfig, userName: user?.name }}
      >
        <Card
          title='????????????'
          bordered={false}
          extra={
            <Button type='primary' htmlType='submit' ghost={true} icon={<CheckOutlined />}>
              ??????
            </Button>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='userName'
                label='???????????????'
                normalize={(name: string) => name && name.trim()}
                extra={<span style={{ fontSize: 11 }}> ?????? Access Token ????????????????????????????????????</span>}
              >
                <Input disabled={true} autoComplete='off' placeholder='????????????????????????' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                required={true}
                name='accessToken'
                normalize={(token: string) => token && token.trim()}
                tooltip='Yuque plugin ?????????????????? Access Token ?????????????????????'
                label={<span style={{ paddingRight: 5 }}>Access Token</span>}
                rules={[{ required: true, message: '????????? Access Token ???????????????????????????' }]}
                extra={
                  <span style={{ fontSize: 11 }}>
                    ??????&nbsp;Access&nbsp;Token?&nbsp;
                    <a href='https://www.yuque.com/settings/tokens' target='_blank' rel='noreferrer'>
                      ????????????
                    </a>
                    ??????
                  </span>
                }
              >
                <Input autoComplete='off' placeholder='??????????????? Access Token' />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  };

  renderBasicCard = () => {
    return (
      <Form<BasicFormFieldsValue>
        name='basic'
        layout='vertical'
        ref={this.basicForm}
        initialValues={this.state.basicConfig}
      >
        <Card
          title='????????????'
          bordered={false}
          extra={
            <Button type='primary' htmlType='submit' ghost={true} icon={<CheckOutlined />}>
              ??????
            </Button>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='????????????'
                name='readingSpeed'
                normalize={(value: string) => Number(value)}
                rules={[
                  { pattern: /^\d+$/g, message: '???????????????' },
                  {
                    validator: async (_rule, speed: string) => {
                      if (speed && Number(speed) > 1500) {
                        return Promise.reject(new Error('????????????????????????????????? 1500 ???/??????'));
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input autoComplete='off' placeholder='??????????????????????????????' suffix='???/??????' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='fontFamily'
                tooltip='??????????????????????????????????????????????????????????????????????????????'
                label={<span style={{ paddingRight: 5 }}>???????????????</span>}
                extra={<span style={{ fontSize: 11 }}>???????????????????????????????????????????????????</span>}
              >
                <Input placeholder='??????????????????????????????????????????????????????' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='musicSrc' label='?????????'>
                <Select placeholder='??????????????????????????????'>
                  {music.map(m => (
                    <Select.Option key={m.id} value={m.id}>
                      {m.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  };

  renderMenuCard = () => {
    const { menuConfig } = this.state;

    return (
      <Form<MenuFormFieldsValue> name='menu' layout='vertical' ref={this.menuForm} initialValues={menuConfig}>
        <Card
          title='????????????'
          bordered={false}
          extra={
            <Button type='primary' htmlType='submit' ghost={true} icon={<CheckOutlined />}>
              ??????
            </Button>
          }
        >
          <Row>
            {Object.keys(menuConfig || {}).map((name: string) => {
              return (
                <React.Fragment key={name}>
                  <Col span={2} style={{ textAlign: 'right' }}>
                    <Form.Item name={name} valuePropName='checked' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ paddingTop: 5 }}>
                    {TypeDescription[name as Type]}
                  </Col>
                </React.Fragment>
              );
            })}
          </Row>
        </Card>
      </Form>
    );
  };

  renderFooter = () => {
    return (
      <div className={cls('footer-container')}>
        Copyright&nbsp;&copy;&nbsp;{new Date().getFullYear()},&nbsp;Powered&nbsp;by&nbsp;
        <a href='https://github.com/CaptainOfPhB' target='_blank' rel='noreferrer'>
          CaptainOfPhB
        </a>
        .
      </div>
    );
  };
}

export default Options;
