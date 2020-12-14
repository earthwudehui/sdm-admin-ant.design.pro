import React from 'react';
import { Button, Tooltip, Tag } from 'antd';
import { DownOutlined, QuestionCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { history } from 'umi';
import { Space,Image,BackTop   } from 'antd';
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
export interface Status {
  color: string;
  text: string;
}

const statusMap = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '已完成',
  },
  2: {
    color: 'volcano',
    text: '警告',
  },
  3: {
    color: 'red',
    text: '失败',
  },
  4: {
    color: '',
    text: '未完成',
  },
};

export interface TableListItem {
  key: number;
  avatar: string,
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
}
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '画面名称',
    width: 120,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '投放状态',
    width: 120,
    dataIndex: 'status',
    render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
  },
  {
    title: '投放渠道数量',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '画面',
    dataIndex: 'avatar',
    key: 'avatar',
    valueType: 'avatar',
    width: 150,
    render: (_, record) => (
      <Space>
        <Image
          width={100}
          src={record.avatar}
        />
        <a href={record.avatar} target="_blank" rel="noopener noreferrer">
          下载
        </a>
      </Space>
    ),
  },
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: (
      <>
        创建时间
        <Tooltip placement="top" title="这是一段描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: '操作',
    width: 164,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="1">链路</a>,
      <a key="2">报警</a>,
      <a key="3">监控</a>,
      <a key="4">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      dates: '2020-12-14',
      dated: '2020-12-24',
      name: '20201209-框架-空位',
      upgradeNum1: '56',
      upgradeNum2: '456',

    });
  }
  return (
    <ProTable
      columns={[
        { title: '渠道名称', dataIndex: 'name', key: 'name' },
        { title: '投放开始日期', dataIndex: 'dates', key: 'dates' },
        { title: '投放结束日期', dataIndex: 'dates', key: 'dated' },

        { title: '今日流量', dataIndex: 'upgradeNum1', key: 'upgradeNum1' },
        { title: '累计流量', dataIndex: 'upgradeNum2', key: 'upgradeNum2' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

export default () => {
  return (
    <>
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
      headerTitle="投放画面"
      options={false}
      toolBarRender={() => [
        <Button key="show">查看日志{history.location.query.id}</Button>,
        <Button key="out">
          导出数据
          <DownOutlined />
        </Button>,
        <Button key="primary" type="primary">
          创建应用
        </Button>,
      ]}
    />
      <BackTop >
        <div style={style}>顶部</div>
      </BackTop>
    </>
  );
};
