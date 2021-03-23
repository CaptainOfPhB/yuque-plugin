import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Row, Col, Card, Form, Input, Button } from 'antd';

import './options.less';

function Options() {
  return (
    <div className='yuque-plugin__options-container'>
      <div className='yuque-plugin__form-container'>
        <Form layout='vertical'>
          <Card title='语雀配置' bordered={false}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label='语雀知识库'>
                  <Input placeholder='请填写语雀知识库名称' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='语雀用户名'>
                  <Input placeholder='请填写语雀用户名' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Access Token'
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
                  <Input placeholder='请填写语雀 Access Token' />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title='基础配置' bordered={false}>
            <Form.Item label='语雀 Token'>
              <Input />
            </Form.Item>
          </Card>
          <Card title='菜单配置' bordered={false}>
            <Form.Item label='语雀 Token'>
              <Input />
            </Form.Item>
          </Card>
          <Row justify='center'>
            <Button type='primary' icon={<CheckOutlined />} style={{ width: 200, marginTop: 50 }}>
              保存配置
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Options;
