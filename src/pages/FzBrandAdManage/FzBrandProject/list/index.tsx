import React, {useState, useRef} from 'react';
import { Button, Divider, message,Drawer } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm , { FormValueType } from './components/UpdateForm';
import { TableListItem } from '@/services/FzBrandAdManageService/FzBrandProjectService/data';
import { query, save,update } from '@/services/FzBrandAdManageService/FzBrandProjectService/service';
import { PlusOutlined } from "@ant-design/icons";
import { history } from 'umi';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  const status = fields.status?0:1;
  try {
    await save({
      brandId: fields.brandId,
      projectName: fields.projectName,
      // status: fields.status,
      status:status,
      remark: fields.remark,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await update({
      id: fields.id,
      brandId: fields.brandId,
      projectName: fields.projectName,
      status: fields.status,
      remark: fields.remark,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

//  * 跳转详情页
//  * @param id
//  */
const detail = function (id: number){
  history.push('/FzBrandAdManage/FzProjectAd/list?id='+id);
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false); // 新建
  const [updateModalVisible,handleUpdateModalVisible] = useState<boolean>(false); // 修改
  const [stepFormValues, setStepFormValues] = useState({});   // 修改
  const actionRef = useRef<ActionType>(); // 刷新使用
  const [row, setRow] = useState<TableListItem>();// 详情数据

   // const { initialState } = useModel('@@initialState'); //获取初始值
  // const { currentUser } = initialState || {};

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
    {
      title: '品牌名称',
      dataIndex: 'xxmc',
      hideInForm: true,       // 新增页面不显示
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
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              detail(record.id);
            }}
          >
            添加广告</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
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
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}  // 请求数据的地方，
        columns={columns}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          alert(success)
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }
      }
      onCancel={() => handleModalVisible(false)}
      modalVisible={createModalVisible}>
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setStepFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        values={stepFormValues}
      />
      ) : null}
      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.projectName && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.projectName}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.projectName,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
