import React from 'react';
import * as Service from '@/service';
import { CheckOutlined } from '@ant-design/icons';
import { Config, Type, TypeDescription } from '@/interface';
import { Row, Col, Card, Form, Input, Button, Checkbox, Skeleton, FormInstance } from 'antd';

import './options.less';

interface OptionsPageState {
  yuqueConfig: Config | undefined;
}

type FieldsValue = Config;

class Options extends React.Component<unknown, OptionsPageState> {
  form = React.createRef<FormInstance<FieldsValue>>();

  state: OptionsPageState = {
    yuqueConfig: undefined
  };

  componentDidMount() {
    chrome.storage.local.get(['yuqueConfig'], store => {
      this.setState({ yuqueConfig: store.yuqueConfig });
    });
  }

  onFinish = (fieldsValues: FieldsValue) => {
    chrome.storage.local.set({ yuqueConfig: fieldsValues }, () => {
      void this.validAccessToken();
    });
  };

  validAccessToken = async () => {
    const user = await Service.getUser<boolean>();
    console.log(user);
  };

  render() {
    const { yuqueConfig } = this.state;

    return (
      <div className='yuque-plugin__options-container'>
        {this.renderHeader()}
        <div className='yuque-plugin__form-container'>
          <Skeleton active={true} loading={!yuqueConfig} title={false} paragraph={{ rows: 20 }}>
            <Form<FieldsValue> layout='vertical' onFinish={this.onFinish} initialValues={yuqueConfig}>
              {this.renderYuqueCard()}
              {this.renderBasicCard()}
              {this.renderMenuCard()}
              {this.renderSubmitButton()}
            </Form>
          </Skeleton>
        </div>
      </div>
    );
  }

  renderHeader = () => {
    return (
      <div className='yuque-plugin__title-container'>
        <div className='yuque-plugin__icon'>
          <img src='../../images/yuque_128.png' alt='yuque logo' />
          <span>Yuque plugin</span>
        </div>
        <div className='yuque-plugin__slug'>Make Yuque more powerful.</div>
      </div>
    );
  };

  renderYuqueCard = () => {
    return (
      <Card title='语雀配置' bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='语雀知识库'
              name={['yuque', 'repoName']}
              normalize={(domain: string) => domain && domain.trim()}
            >
              <Input autoComplete='off' placeholder='请填写语雀知识库名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='语雀用户名'
              name={['yuque', 'userName']}
              normalize={(name: string) => name && name.trim()}
            >
              <Input autoComplete='off' placeholder='请填写语雀用户名' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['yuque', 'accessToken']}
              normalize={(token: string) => token && token.trim()}
              tooltip='Yuque plugin 部分功能需要 Access Token 验证后才能使用'
              label={<span style={{ paddingRight: 5 }}>Access Token</span>}
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
          <Col span={12}>
            <Form.Item
              name={['yuque', 'domain']}
              label={<span style={{ paddingRight: 5 }}>语雀域名</span>}
              tooltip={{
                overlayStyle: { lineBreak: 'anywhere' },
                title: '若为企业空间，则填入企业二级域名。例如 https://taobao.yuque.com 则填入 taobao 即可。'
              }}
              extra={
                <span style={{ fontSize: 11 }}>
                  企业空间暂未开放， 详情可查看
                  <a href='https://www.yuque.com/yuque/developer/api#c8c7d76f' target='_blank' rel='noreferrer'>
                    开发者文档
                  </a>
                  评论
                </span>
              }
            >
              <Input
                disabled={true}
                autoComplete='off'
                prefix='https://'
                suffix='.yuque.com/api/v2'
                placeholder='填入www/企业二级域'
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    );
  };

  renderBasicCard = () => {
    return (
      <Card title='基础配置' bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='阅读速度'
              name={['basic', 'readingSpeed']}
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
        </Row>
      </Card>
    );
  };

  renderMenuCard = () => {
    const { yuqueConfig } = this.state;

    return (
      <Card title='菜单配置' bordered={false}>
        <Row>
          {Object.keys(yuqueConfig?.menu || {}).map((name: string) => {
            return (
              <React.Fragment key={name}>
                <Col span={6} style={{ paddingTop: 4, margin: '0 10px', textAlign: 'right' }}>
                  {TypeDescription[name as Type]}
                </Col>
                <Col span={1}>
                  <Form.Item
                    name={['menu', name]}
                    valuePropName='checked'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Checkbox />
                  </Form.Item>
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
      </Card>
    );
  };

  renderSubmitButton = () => {
    return (
      <Row justify='center'>
        <Button type='primary' htmlType='submit' icon={<CheckOutlined />} style={{ width: 200, marginTop: 50 }}>
          保存配置
        </Button>
      </Row>
    );
  };
}

export default Options;
