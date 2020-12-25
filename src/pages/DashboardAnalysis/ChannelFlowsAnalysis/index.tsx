import React, {useState, useRef, useEffect} from 'react';
import {BackTop, Button} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType,} from '@ant-design/pro-table';
import { TableListItemChannel } from '@/services/DashboardAnalysis/AnalysisStatisticsAdChannel/data';
import { queryBrandChannelJump} from '@/services/DashboardAnalysis/AnalysisStatisticsAdChannel/service';
import { PlusOutlined, AimOutlined} from "@ant-design/icons";
import ProCard from '@ant-design/pro-card';
import {findDictionaryValueEnumByDicname} from "@/services/utile";
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
  const [tab, setTab] = useState('tab1');
  const [dataSource, setDataSource] = useState();
  const [category,setCategory] = useState<any>();

  useEffect(() => {
    getType();
  }, []);
  async function getType(){
    let res = await findDictionaryValueEnumByDicname("channel");
    if(res){
      let categor = {};
      for(let item of res){
        categor[item.value] = item.label;
      }
      setCategory(categor)//列表字段
    }
  }
  // 表格合并
  function postDataSetDataSource(dataSource:any[]) {
    setDataSource(dataSource);
    return dataSource;
  }

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
      title: '品牌名称',
      dataIndex: 'xxmc',
      ellipsis: true,         // 是否自动缩略
      render: (value, row, index) => {
        //在 render中所有的合并都仅仅相对所有的name这一列来说, index从0开始计算
        const obj = {
          children: value,
          props: {}
        };
        const arrResult = mergeCells(dataSource, 'brandId');
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
      dataIndex: 'channelId',
      valueEnum:category,
      hideInSearch: true,      // 设置搜索栏是否显示
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
      title: '导流数据',
      dataIndex: 'jumpUV',
      hideInSearch: true,      // 设置搜索栏是否显示
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
          <ProCard.TabPane key="tab1"   tab={<span><AimOutlined />品牌渠道导流统计</span>}  >
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
              toolBarRender={() => [
                <Button type="primary" onClick={() => {alert("敬请期待");}}>
                  <PlusOutlined /> 导出
                </Button>,
              ]}
              request={(params, sorter, filter) => queryBrandChannelJump({ ...params, sorter, filter })}  // 请求数据的地方，
              columns={columnsTab1}
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
