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
              ? 'Access Token 所属用户与之前不一致，若您意为更改用户，请忽略此消息。'
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
    success ? notification.success({ description, message: '配置保存成功' }) : void message.error('配置保存失败');
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
          title='语雀配置'
          bordered={false}
          extra={
            <Button type='primary' htmlType='submit' ghost={true} icon={<CheckOutlined />}>
              保存
            </Button>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='userName'
                label='语雀用户名'
                normalize={(name: string) => name && name.trim()}
                extra={<span style={{ fontSize: 11 }}> 填入 Access Token 并保存，将自动获取用户名</span>}
              >
                <Input disabled={true} autoComplete='off' placeholder='请填写语雀用户名' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                required={true}
                name='accessToken'
                normalize={(token: string) => token && token.trim()}
                tooltip='Yuque plugin 部分功能需要 Access Token 验证后才能使用'
                label={<span style={{ paddingRight: 5 }}>Access Token</span>}
                rules={[{ required: true, message: '请填写 Access Token 以使用插件全部功能' }]}
                extra={
                  <span style={{ fontSize: 11 }}>
                    没有&nbsp;Access&nbsp;Token?&nbsp;
                    <a href='https://www.yuque.com/settings/tokens' target='_blank' rel='noreferrer'>
                      点击这里
                    </a>
                    新建
                  </span>
                }
              >
                <Input autoComplete='off' placeholder='请填写语雀 Access Token' />
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
          title='基础配置'
          bordered={false}
          extra={
            <Button type='primary' htmlType='submit' ghost={true} icon={<CheckOutlined />}>
              保存
            </Button>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='阅读速度'
                name='readingSpeed'
                normalize={(value: string) => Number(value)}
                rules={[
                  { pattern: /^\d+$/g, message: '请填写数字' },
                  {
                    validator: async (_rule, speed: string) => {
                      if (speed && Number(speed) > 1500) {
                        return Promise.reject(new Error('阅读速度太快，最大支持 1500 字/分钟'));
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input autoComplete='off' placeholder='请填写每分钟阅读字数' suffix='字/分钟' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='fontFamily'
                tooltip='覆盖语雀页面字体，若部分字体覆盖不全，请联系插件作者'
                label={<span style={{ paddingRight: 5 }}>自定义字体</span>}
                extra={<span style={{ fontSize: 11 }}>若有英文字体名，请置于中文字体名前</span>}
              >
                <Input placeholder='请填写字体名，多个以英文逗号进行分隔' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='musicSrc' label='环境声'>
                <Select placeholder='请选择你喜欢的环境声'>
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
          title='菜单配置'
          bordered={false}
          extra={
            <Button type='primary' htmlType='submit' ghost={true} icon={<CheckOutlined />}>
              保存
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
