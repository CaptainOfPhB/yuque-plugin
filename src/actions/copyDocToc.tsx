import React from 'react';
import store from '@/store';
import { DocSerializer } from '@/interface';
import copyToClipboard from '@/helper/copyToClipboard';
import { getBooksBy, getDocOfBookBy, getDocsOfBookBy } from '@/service';
import { Form, FormInstance, Input, message, Modal, Select } from 'antd';

interface FieldsValue {
  slug: string;
  namespace: string;
  docs: unknown;
}

const form = React.createRef<FormInstance<FieldsValue>>();

async function onValuesChange(value: Partial<FieldsValue>) {
  if (value.namespace) {
    const docs = await getDocsOfBookBy(value.namespace);
    if (!docs) return message.error('获取知识库文档失败');

    form.current?.setFieldsValue({ docs, slug: undefined });
  }
}

function shouldUpdate(prevValues: FieldsValue, nextValues: FieldsValue) {
  return prevValues.docs !== nextValues.docs;
}

async function onConfirm() {
  const values = await form.current?.validateFields();

  const doc = await getDocOfBookBy(values!.namespace, values!.slug);
  if (!doc) return message.error('获取知识库目录结构失败');

  const parser = new DOMParser();
  const document = parser.parseFromString(doc.body_lake, 'text/html');
  const children = document.body.children;

  const toc = Array.from(children)
    .filter(child => ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(child.nodeName))
    .map(headNode => {
      const [level] = headNode.nodeName.split('').reverse();
      const prefix = '   '.repeat(Number(level) - 1);
      const origin = 'https://www.yuque.com';
      return `[${prefix}${headNode.textContent}](${origin}/${values!.namespace}/${doc.slug}#${headNode.id})<br/>`;
    })
    .join('');

  await copyToClipboard(toc, '文档大纲');
}

async function copyDocToc() {
  const user = await store.get<{ id: number }>('user', ['id']);
  if (!user) return;

  const books = await getBooksBy(user.id);
  if (!books) return message.error('获取知识库失败');

  Modal.confirm({
    icon: null,
    okText: '复制',
    onOk: onConfirm,
    cancelText: '取消',
    content: (
      <Form<FieldsValue> ref={form} layout='vertical' onValuesChange={onValuesChange}>
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
        <Form.Item noStyle={true} shouldUpdate={shouldUpdate}>
          {({ getFieldValue }) => {
            const docs = (getFieldValue('docs') || []) as DocSerializer[];
            const isBookSelected = getFieldValue('namespace') !== undefined;
            return (
              <Form.Item name='slug' label='文档' rules={[{ required: true, message: '请选择需要复制大纲的文档' }]}>
                <Select placeholder='请选择知识库下的文档' disabled={!isBookSelected}>
                  {docs.map(doc => (
                    <Select.Option key={doc.slug} value={doc.slug}>
                      {doc.title}
                      <span style={{ color: '#ccc' }}>{doc.description ? ` - ${doc.description}` : null}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            );
          }}
        </Form.Item>
        {/* DO NOT REMOVE HIDDEN PROP */}
        <Form.Item hidden={true} label='hidden for save docs value' name='docs'>
          <Input />
        </Form.Item>
      </Form>
    )
  });
}

export default copyDocToc;
