import React from 'react';
import {TableListItemChannel} from "@/services/DashboardAnalysis/AnalysisStatisticsAdChannel/data";
import { Column } from '@ant-design/charts';
import {Modal} from "antd";

export interface FormValueType extends Partial<TableListItemChannel> {

}
interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<FormValueType>;
  data:any[];
}

const Columncharts: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel,values,data } = props;

  var config = {
    data: data,
    isGroup: true,
    xField: 'xField',
    yField: 'yField',
    seriesField: 'seriesField',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' }
      ]
    }
  };
  return (
    <Modal
      destroyOnClose //关闭时销毁 Modal 里的子元素
      title={values.channelName+"(投放周期:"+values.startDate+" -- "+values.endDate+")"}
      width={800}
      visible={modalVisible}  //对话框是否可见
      onCancel={() => onCancel()}
      footer={null} //底部内容，当不需要默认底部按钮时
    >
      <Column {...config} />
    </Modal>
  );
};

export default Columncharts;
