import React, {useState, useRef} from 'react';
import { Button, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from '@/services/FzBrandAdManageService/FzBrandProjectService/data';
import { query } from '@/services/FzBrandAdManageService/FzBrandProjectService/service';
import {LeftCircleTwoTone, PlusOutlined} from "@ant-design/icons";
import { history } from 'umi';
import { Tabs } from 'antd';


function callback(key) {
  console.log(key);
}
const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>(); // 刷新使用
  const [row, setRow] = useState<TableListItem>();// 详情数据

  /**
   * 页面权限处理
   */
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'id',            // 表头显示的名称
      dataIndex: 'id',       // 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
      hideInSearch: true,      // 设置搜索栏是否显示
      hideInTable: true,       // list页面不显示
      hideInForm: true,       // 新增页面不显示
    },
    // {
    //   title: '品牌名称',
    //   dataIndex: 'xxmc',
    //   hideInForm: true,       // 新增页面不显示
    // },
    {
      title: '品牌',
      dataIndex: 'brandId',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,      // 设置搜索栏是否显示
      ellipsis: true,         // 是否自动缩略
      tip: '标题过长会自动收缩',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum:  {               // 当前列值的枚举
        0: { text: '正常', color: 'blue',status: '0' },
        1: { text: '禁用', color: 'red',status: '1' }
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {

            }}
          >
            修改
          </a>
        </>

      ),
    },
  ];

  return (
    <PageContainer>
      <Tabs onChange={callback} type="card">
        <Tabs.TabPane tab="Tab 1" key="1">
          <ProTable<TableListItem>      // 表格Pro组件
            headerTitle="查询表格"       // 表头
            actionRef={actionRef}      // 用于触发刷新操作等，看api
            rowKey="id"              // 表格行 key 的取值，可以是字符串或一个函数
            search={{
              labelWidth: 120,
            }}
            options={{                // 全屏
              search: false,          // 去除查询
            }}
            toolBarRender={() => [
              <Button key="primary"  onClick={() =>  history.goBack()}>
                返回列表
                <LeftCircleTwoTone />
              </Button>,
              <Button type="primary" onClick={() => {}}>
                <PlusOutlined /> 导出
              </Button>,
            ]}
            request={(params, sorter, filter) => query({ ...params, sorter, filter })}  // 请求数据的地方，
            columns={columns}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default TableList;
