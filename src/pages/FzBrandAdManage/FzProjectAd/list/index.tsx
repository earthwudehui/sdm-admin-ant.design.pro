import React, {useState, useRef, useEffect} from 'react';
import {Modal,Button, Divider, message, Space, Image, Upload, BackTop,Card, Descriptions } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm , { FormValueType } from './components/UpdateForm';
import { TableListItem } from '@/services/FzBrandAdManageService/FzProjectAdService/data';
import { query, save,update } from '@/services/FzBrandAdManageService/FzProjectAdService/service';
import { PlusOutlined,LeftCircleTwoTone,ExclamationCircleOutlined} from "@ant-design/icons";
import { history,useParams } from 'umi';
import { queryFzBrandProjectById } from '@/services/FzBrandAdManageService/FzBrandProjectService/service';
import { queryChannel,saveChannel,updateChannel,deleteChannel } from '@/services/FzBrandAdManageService/FzAdChannelService/service';
import { TableListItemChannel } from '@/services/FzBrandAdManageService/FzAdChannelService/data';
import CreateFormChannel, { FormValueTypeChannel } from '@/pages/FzBrandAdManage/FzAdChannel/list/components/CreateFormChannel';
import UpdateFormChannel from '@/pages/FzBrandAdManage/FzAdChannel/list/components/UpdateFormChannel';

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


/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  const status = fields.status?0:1;
  try {
    await save({
      // brandId: fields.brandId.value,
      brandId: fields.brandId,
      projectId: fields.projectId,
      adName: fields.adName,
      status:status,// +"" 为String，不加为int
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
  const status = fields.status?0:1;
  try {
    await update({
      id: fields.id,
      adName: fields.adName,
      status:status,// +"" 为String，不加为int
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

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false); // 新建
  const [updateModalVisible,handleUpdateModalVisible] = useState<boolean>(false); // 修改
  const [stepFormValues, setStepFormValues] = useState({});   // 修改
  const actionRef = useRef<ActionType>(); // 刷新使用
  // const params = useParams();
  const [FzBrandProject, setFzBrandProject] = useState({});   // 修改

  useEffect(() => {
    queryFzBrandProjectById(history.location.query.projectId).then(res=>{setFzBrandProject(res)})
  }, []);
  // const { initialState } = useModel('@@initialState'); //获取初始值
  // const { currentUser } = initialState || {};

  /**
   * 子表格
   */
  const [createModalVisibleChannel, handleModalVisibleChannel] = useState<boolean>(false); // 新建
  const actionRefChannel = useRef<ActionType>(); // 刷新使用
  const [updateModalVisibleChannel,handleUpdateModalVisibleChannel] = useState<boolean>(false); // 修改
  const [stepFormValuesChannel, setStepFormValuesChannel] = useState({});   // 修改
  const { confirm } = Modal;
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
    //   hideInSearch: true,      // 设置搜索栏是否显示
    // },
    // {
    //   title: '项目名称',
    //   dataIndex: 'projectName',
    //   ellipsis: true,         // 是否自动缩略
    //   hideInSearch: true,      // 设置搜索栏是否显示
    // },
    {
      title: '画面名称',
      dataIndex: 'adName',
      ellipsis: true,         // 是否自动缩略
    },
    {
      title: '画面',
      dataIndex: 'pictrueUrl',
      width: 150,
      hideInSearch: true,      // 设置搜索栏是否显示
      render: (_, record) => (
        <Space>
          <Image
            width={100}
            src={record.pictureUrl}
          />
        </Space>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,      // 设置搜索栏是否显示
      ellipsis: true,         // 是否自动缩略
      tip: '标题过长会自动收缩',
    },
    {
      title: '投放状态',
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
          <Upload {...props}>
            <a >上传画面</a>
          </Upload>
        </>
      ),
    },
  ];
  const expandedRowRender = (value) => {
    const expandableColumns: ProColumns<TableListItemChannel>[] = [
      {
        title: 'id',
        dataIndex: 'id',
        hideInSearch: true,      // 设置搜索栏是否显示
        hideInTable: true,       // list页面不显示
        hideInForm: true,       // 新增页面不显示
      },
      { title: '渠道名称', dataIndex: 'channelName',  },
      { title: '投放开始日期', dataIndex: 'startDate' },
      { title: '投放结束日期', dataIndex: 'endDate' },
      {
        title: '渠道类型',
        dataIndex: 'channelType',
        valueEnum:  {               // 当前列值的枚举
          0: { text: '首页', color: 'red',status: '0' },
          1: { text: '专栏', color: 'blue',status: '1' }
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueEnum:  {               // 当前列值的枚举
          0: { text: '正常', color: 'blue',status: '0' },
          1: { text: '禁用', color: 'red',status: '1' }
        }
      },

      // { title: '今日流量', dataIndex: 'upgradeNum1' },
      // { title: '累计流量', dataIndex: 'upgradeNum2'},
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            <a
              onClick={() => {
                handleUpdateModalVisibleChannel(true);
                setStepFormValuesChannel(record);
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                handleDeleteChannel (record);
              }}
            >
              删除</a>
          </>
        ),
      },
    ]
    /**
     * 添加节点
     * @param fields
     */
    const handleAddChannel = async (fields: FormValueTypeChannel) => {
      const hide = message.loading('正在添加');
      const status = fields.status?0:1;
      var data = fields.dateTime.toString();
      const startDate = data.split(",")[0];
      const endDate = data.split(",")[1];
      try {
        await saveChannel({
          brandId: fields.brandId,          // brandId: fields.brandId.value,
          // projectId: fields.projectId,
          channelId: fields.channelId.value,
          channelName: fields.channelId.label,
          adId: fields.adId,
          channelType: fields.channelType,
          type: fields.type,
          startDate:startDate,
          endDate: endDate,
          status:status,// +"" 为String，不加为int
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
    const handleUpdateChannel = async (fields: FormValueTypeChannel) => {
      const hide = message.loading('正在配置');
      const status = fields.status?0:1;
      var data = fields.dateTime.toString();
      const startDate = data.split(",")[0];
      const endDate = data.split(",")[1];
      try {
        await updateChannel({
          id: fields.id,          // brandId: fields.brandId.value,
          channelType: fields.channelType,
          type: fields.type,
          startDate:startDate,
          endDate: endDate,
          status:status,// +"" 为String，不加为int
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

    /**
     * 删除节点
     * @param fields
     */
    const handleDeleteChannelFunction = async (fields: FormValueTypeChannel) => {
      const hide = message.loading('正在删除');
      try {
        const success = await deleteChannel(
          fields.id
        );
        hide();
        message.success('删除成功');
        if (success) {
          if (actionRefChannel.current) {
            actionRefChannel.current.reload();
          }
        }
        return true;
      } catch (error) {
        hide();
        message.error('删除失败请重试！');
        return false;
      }
    };
    const handleDeleteChannel = async (fields: FormValueTypeChannel) => {
      confirm({
        title: '请确认是否删除渠道统计?',
        icon: <ExclamationCircleOutlined />,
        content: fields.channelName,
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          handleDeleteChannelFunction(fields);
        },
        onCancel() {
        },
      });
    };


    return (
      <>
        <ProTable
          columns={expandableColumns}
          actionRef={actionRefChannel}      // 用于触发刷新操作等，看api
          params={{'adId':value.id}}
          request={(params, sorter, filter) => queryChannel({ ...params, sorter, filter })}  // 请求数据的地方，
          toolBarRender={() => [
            <Button type="primary" onClick={() => handleModalVisibleChannel(true)}>
              <PlusOutlined /> 新增渠道
            </Button>,
          ]}
          headerTitle={false}
          search={false}
          options={false}
          pagination={false}
        />
        <CreateFormChannel
          onSubmit={async (value) => {
            const success = await handleAddChannel(value);
            if (success) {
              handleModalVisibleChannel(false);
              if (actionRefChannel.current) {
                actionRefChannel.current.reload();
              }
            }
          }
          }
          onCancel={() => handleModalVisibleChannel(false)}
          values={value}
          modalVisible={createModalVisibleChannel}
        />
        {stepFormValuesChannel && Object.keys(stepFormValuesChannel).length ? (
          <UpdateFormChannel
            onSubmit={async (value) => {
              const success = await handleUpdateChannel(value);
              if (success) {
                handleUpdateModalVisibleChannel(false);
                setStepFormValuesChannel({});
                if (actionRefChannel.current) {
                  actionRefChannel.current.reload();
                }
              }
            }
            }
            onCancel={() => {
              handleUpdateModalVisibleChannel(false);
              setStepFormValuesChannel({});
            }}
            updateModalVisible={updateModalVisibleChannel}
            values={stepFormValuesChannel}
          />
        ) : null}
    </>
    );
  };
  return (
    <>
      <PageContainer>
        <ProTable<TableListItem>      // 表格Pro组件
          headerTitle="查询表格"       // 表头
          actionRef={actionRef}      // 用于触发刷新操作等，看api
          rowKey="id"              // 表格行 key 的取值，可以是字符串或一个函数
          search={{
            labelWidth: 120,
          }}
          expandable={{ expandedRowRender }}
          options={{                // 全屏
            search: false,          // 去除查询
          }}
          tableExtraRender={(_, data) => (
            <Card>
              <Descriptions size="small" column={2}>
                <Descriptions.Item label="项目名称">{FzBrandProject.projectName}</Descriptions.Item>
                <Descriptions.Item >
                  <Button type="primary"  onClick={() =>  history.goBack()}>
                    <LeftCircleTwoTone />返回列表
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
          // params={{history.location.query.brandId},{'projectId':history.location.query.projectId}}
          params={{'brandId':history.location.query.brandId,'projectId':history.location.query.projectId}}
          toolBarRender={() => [
            // <Button key="primary"  onClick={() =>  history.goBack()}>
            //   返回列表
            //   <LeftCircleTwoTone />
            // </Button>,
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
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }
          }
          brandId = {history.location.query.brandId}
          projectId = {history.location.query.projectId}
          projectName ={FzBrandProject.projectName}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        />
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
            }
            }
            onCancel={() => {
              handleUpdateModalVisible(false);
              setStepFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageContainer>
      <BackTop >
        <div style={style}>顶部</div>
      </BackTop>
    </>
  );
};

export default TableList;
