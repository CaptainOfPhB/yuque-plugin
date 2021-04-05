import React from 'react';
import store from '@/store';
import { PublicEnumeration } from '@/interface';
import { createDocWith, getBooksBy } from '@/service';
import { Form, FormInstance, Input, message, Modal, Select } from 'antd';

interface FieldsValue {
  body: string;
  title: string;
  namespace: string;
}

const form = React.createRef<FormInstance<FieldsValue>>();

function getTimeString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = zerofill(date.getMonth() + 1);
  const day = zerofill(date.getDate());
  const hours = zerofill(date.getHours());
  const minutes = zerofill(date.getMinutes());
  const seconds = zerofill(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function zerofill(num: number) {
  return num > 9 ? num.toString() : `0${num}`;
}

async function onConfirm() {
  const values = await form.current?.validateFields();

  const createdDoc = await createDocWith({
    namespace: values!.namespace,
    public: PublicEnumeration.Public,
    title: values?.title || getTimeString(),
    body: values?.body || '本文档由 Yuque plugin 快速生成。'
  });

  if (!createdDoc) return message.error('生成日记失败');
  void message.success('速记生成成功');

  setTimeout(() => {
    window.open(`https://www.yuque.com/${values!.namespace}/${createdDoc.slug}/edit`, '_blank');
  }, 700);
}

async function createShorthand() {
  const user = await store.get<{ id: number }>('user', ['id']);
  if (!user) return;

  const books = await getBooksBy(user.id);
  if (!books) return message.error('获取知识库失败');

  Modal.confirm({
    width: 800,
    icon: null,
    okText: '生成',
    onOk: onConfirm,
    cancelText: '取消',
    maskClosable: true,
    content: (
      <Form<FieldsValue> ref={form} layout='vertical'>
        <Form.Item name='namespace' label='知识库' rules={[{ required: true, message: '请选择知识库' }]}>
          <Select placeholder='请选择知识库' style={{ width: '100%' }}>
            {books.map(book => (
              <Select.Option key={book.namespace} value={book.namespace}>
                {book.name}
                <span style={{ color: '#ccc' }}>{book.description ? ` - ${book.description}` : null}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='title' label='速记标题' rules={[{ whitespace: true, message: '不要填写空格' }]}>
          <Input autoComplete='off' placeholder='请填写速记标题，不填默认为生成时的时间戳' />
        </Form.Item>
        <Form.Item
          name='body'
          label='速记内容'
          extra='内容不要超过 5M，否则生成失败'
          rules={[{ whitespace: true, message: '不要填写空格' }]}
        >
          <Input.TextArea autoSize={{ minRows: 5 }} placeholder='请填写速记内容，支持 markdown 文本格式' />
        </Form.Item>
      </Form>
    )
  });
}

export default createShorthand;
