import React, {useState, useRef} from 'react';
import {BackTop, Button, Image, Space, Tag} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType,} from '@ant-design/pro-table';
import { TableListItemChannel } from '@/services/DashboardAnalysis/AnalysisStatisticsAdChannel/data';
import {
  queryByAdStatistics,
  queryByAd,
  queryByAdChannelId
} from '@/services/DashboardAnalysis/AnalysisStatisticsAdChannel/service';
import {LeftCircleTwoTone, PlusOutlined, AppleOutlined, AndroidOutlined} from "@ant-design/icons";
import { history } from 'umi';
import ProCard from '@ant-design/pro-card';
import Columncharts  from './components/Columncharts';
import {mergeCells} from "@/utils/tableUtils";

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

const TableList: React.FC<{}> = () => {
  const actionRefTab1 = useRef<ActionType>(); // 刷新使用
  const actionRefTab2 = useRef<ActionType>(); // 刷新使用

  const [tab, setTab] = useState('tab1');
  const [dataSource, setDataSource] = useState();
  const [dataSource2, setDataSource2] = useState();

  const [createModalVisibleChannel, handleModalVisibleChannel] = useState<boolean>(false); // tab2 明细
  const [stepFormValues, setStepFormValues] = useState({});   // tab2 明细
  const [dataCharts, setDataCharts] = useState([]);//报表数据

  // 表格合并
  function postDataSetDataSource(dataSource:any[]) {
    setDataSource(dataSource);
    return dataSource;
  }

  function postDataSetDataSource2(dataSource:any[]) {
    setDataSource2(dataSource);
    return dataSource;
  }

  function asyncFetch  (id:number) {
      queryByAdChannelId(id).then((json) => setDataCharts(json));
    return dataCharts;
  };
  const columnsTab1: ProColumns<TableListItemChannel>[] = [
    {
      title: '统计日期',
      dataIndex: 'statisticsDate',
      colSize:1.5,
      hideInSearch: true,      // 设置搜索栏是否显示
      render: (value, row, index) => {
        //在 render中所有的合并都仅仅相对所有的name这一列来说, index从0开始计算
        const obj = {
          children: value,
          props: {}
        };
        const arrResult = mergeCells(dataSource, 'statisticsDate');
        for (let i = 0; i < arrResult[0].length; i++) {
          if (index == arrResult[1][i]) {
            obj.props.rowSpan = arrResult[0][i];
          }
          if (index > arrResult[1][i] && index < arrResult[1][i + 1]) {
            obj.props.rowSpan = 0
          }
        }
        return obj;
      }
    },
    {
      title: '渠道名称',
      dataIndex: 'channelName',
      width: '30%',
      ellipsis: true,         // 是否自动缩略
      hideInSearch: true,      // 设置搜索栏是否显示
    },
    {
      title: '投放类型',
      dataIndex: 'channelType',
      hideInSearch: true,      // 设置搜索栏是否显示
      tip: '投放类型为首页，数据统计取首页投放渠道访问人数',
      valueEnum:  {               // 当前列值的枚举
        0: { text: '首页', color: 'red',status: '0' },
        1: { text: '专栏', color: 'blue',status: '1' }
      }
    },
    {
      title: '统计日期',
      dataIndex: 'statisticsDate',
      valueType: 'dateRange',
      colSize:1.5,
      hideInTable: true,       // list页面不显示
      search: {
        transform: (value: any) => ({ statisticsDateStart: value[0], statisticsDateEnd: value[1] }),
      },
    },
    {
      title: '扫码数据',
      dataIndex: 'scanCodeUV',
      hideInSearch: true,      // 设置搜索栏是否显示
      tip: '蓝色为异常数据，专栏流量小于导流量',
      render: (_, record) => (
        <Space>
          {record.scanCodeUV<record.jumpUV?
            (<Tag color='blue' >
              {record.scanCodeUV}
            </Tag>):record.scanCodeUV
          }
        </Space>
      ),
    },
    {
      title: '导流数据',
      dataIndex: 'jumpUV',
      hideInSearch: true,      // 设置搜索栏是否显示
    },
  ];

  const columnsTab2: ProColumns<TableListItemChannel>[] = [
    {
      title: '画面名称',
      dataIndex: 'adName',
      ellipsis: true,         // 是否自动缩略
      width: '18%',
      order: 1,
      render: (value, row, index) => {
        const obj = {
          // children: row.adName,
          children: value,
          props: {}
        };
        const arrResult = mergeCells(dataSource2, 'adId');
        for (let i = 0; i < arrResult[0].length; i++) {
          if (index === arrResult[1][i]) {
            obj.props.rowSpan = arrResult[0][i];
          }
          if (index > arrResult[1][i] && index < arrResult[1][i + 1]) {
            obj.props.rowSpan = 0
          }
        }
        return obj;
      }
    },
    {
      title: '画面素材',
      dataIndex: 'pictureUrl',
      // valueType: 'avatar',
      width: 120,
      hideInSearch: true,      // 设置搜索栏是否显示
      render: (value, row, index) => {
        const obj = {
          children:<Image width={100} src={value} />,
          props: {}
        };
        const arrResult = mergeCells(dataSource2, 'adId');
        for (let i = 0; i < arrResult[0].length; i++) {
          if (index == arrResult[1][i]) {
            obj.props.rowSpan = arrResult[0][i];
          }
          if (index > arrResult[1][i] && index < arrResult[1][i + 1]) {
            obj.props.rowSpan = 0
          }
        }
        return obj;
      }
    },
    {
      title: '渠道名称',
      dataIndex: 'channelName',
      width: '22%',
      ellipsis: true,         // 是否自动缩略
      hideInSearch: true,      // 设置搜索栏是否显示
    },
    {
      title: '投放周期起',
      width: '10%',
      dataIndex: 'startDate',
      hideInSearch: true,      // 设置搜索栏是否显示
    },
    {
      title: '投放周期止',
      width: '10%',
      dataIndex: 'endDate',
      hideInSearch: true,      // 设置搜索栏是否显示
    },
    {
      title: '类型',
      dataIndex: 'channelType',
      order:2,
      hideInSearch: true,      // 设置搜索栏是否显示
      valueEnum:  {               // 当前列值的枚举
        0: { text: '首页', color: 'red',status: '0' },
        1: { text: '专栏', color: 'blue',status: '1' }
      }
    },
    {
      title: '扫码',
      dataIndex: 'scanCodeUV',
      hideInSearch: true,      // 设置搜索栏是否显示
    },
    {
      title: '导流',
      dataIndex: 'jumpUV',
      hideInSearch: true,      // 设置搜索栏是否显示
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisibleChannel(true);
              setStepFormValues(record);
              asyncFetch(record.id);
            }}
          >
            明细
          </a>
        </>

      ),
    },
  ];
  return (
    <>
      <PageContainer>
        <ProCard
          tabs={{
            type: 'card',
            activeKey: tab,
            onChange: (key) => {
              setTab(key);
            },
            }
          }
        >
          <ProCard.TabPane key="tab1"   tab={<span><AndroidOutlined />按投放日期统计</span>}  >
            <ProTable<TableListItemChannel>      // 表格Pro组件
              // manualRequest={true}
              postData={(data) => postDataSetDataSource(data)}//获取ProTable数据
              headerTitle="查询表格"       // 表头
              actionRef={actionRefTab1}      // 用于触发刷新操作等，看api
              rowKey="id"              // 表格行 key 的取值，可以是字符串或一个函数
              search={{
                labelWidth: 120,
              }}
              options={{                // 全屏
                search: false,          // 去除查询
              }}
              params={{'brandId':history.location.query.brandId,'projectId':history.location.query.projectId}}
              toolBarRender={() => [
                <Button type="primary"  onClick={() =>  history.goBack()}>
                  返回列表
                  <LeftCircleTwoTone />
                </Button>,
                <Button type="primary" onClick={() => {alert("敬请期待");}}>
                  <PlusOutlined /> 导出
                </Button>,
              ]}
              request={(params, sorter, filter) => queryByAdStatistics({ ...params, sorter, filter })}  // 请求数据的地方，
              columns={columnsTab1}
            />
          </ProCard.TabPane>
          <ProCard.TabPane key="tab2" tab={<span><AppleOutlined />按投放画面统计</span>}
          >
            <ProTable<TableListItemChannel>      // 表格Pro组件
              postData={(data) => postDataSetDataSource2(data)}//获取ProTable数据
              headerTitle="查询表格"       // 表头
              actionRef={actionRefTab2}      // 用于触发刷新操作等，看api
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
                <Button type="primary" onClick={() => {alert("敬请期待")}}>
                  <PlusOutlined /> 导出
                </Button>,
              ]}
              request={(params, sorter, filter) => queryByAd({ ...params, sorter, filter })}  // 请求数据的地方，
              columns={columnsTab2}
            />
            <Columncharts
              onCancel={() => {
                handleModalVisibleChannel(false);
                setStepFormValues({});
              }}
              modalVisible={createModalVisibleChannel}
              values={stepFormValues}
              data={dataCharts}
            />
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
      <BackTop >
        <div style={style}>顶部</div>
      </BackTop>
     </>
  );
};

export default TableList;
