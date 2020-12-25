import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Row, Col,Divider,Button   } from 'antd';
import { Fullscreen } from '@alitajs/antd-plus';


const DemoLine: React.FC = () => {
  const [enabled, setEnabled] = React.useState(false);
  const handleClick = () => {
    setEnabled(!enabled);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  var config = {
    data: data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  };
  return  (
    <Fullscreen
      enabled={enabled}
      target={document.documentElement}
      onClose={(error) => {
        console.log('close');
      }}
    >
        <div ><Button onClick={handleClick}>切换全屏</Button></div>
        <Row gutter={24}>
          <Col  span={6}>
            <ProCard title="PV统计"  tooltip="PV">
              100
            </ProCard>
          </Col>
          <Col  span={6}>
            <ProCard title="UV统计"  tooltip="UV">
              100
            </ProCard>
          </Col>
          <Col span={6}>
            <ProCard title="注册人数"  tooltip="PV">
              100
            </ProCard>
          </Col>
          <Col span={6}>
            <ProCard title="今日注册人数"  tooltip="PV">
              100
            </ProCard>
          </Col>
        </Row>
        <Divider orientation="left">Horizontal</Divider>
        <Row gutter={16}>
          <Col  span={24}>
            <ProCard title="流量统计"  tooltip="PV">
              <Line {...config} />
            </ProCard>
          </Col>
        </Row>
    </Fullscreen>
  )

};
export default DemoLine;
