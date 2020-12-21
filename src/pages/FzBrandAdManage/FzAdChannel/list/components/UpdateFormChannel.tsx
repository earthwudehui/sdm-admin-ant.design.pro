import React from 'react';
import ProForm, {
  ModalForm,
  ProFormTextArea,
  ProFormSwitch,
  ProFormText, ProFormSelect, ProFormDateRangePicker,
} from '@ant-design/pro-form';
import {TableListItemChannel} from "@/services/FzBrandAdManageService/FzAdChannelService/data";
import  { FormValueTypeChannel } from './CreateFormChannel';
import moment from 'moment';
import { Input} from 'antd';


interface UpdateFormChannelProps {
  onCancel: () => void;
  onSubmit: (values: FormValueTypeChannel) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItemChannel>;
}

const UpdateFormChannel: React.FC<UpdateFormChannelProps> = (props) => {
  const { updateModalVisible, onCancel,onSubmit,values } = props;

   return (
    <ModalForm
      title="修改渠道信息"
      width={400}
      visible={updateModalVisible}
      onVisibleChange={() => onCancel()}
      onFinish={ async (values) => onSubmit(values)}
    >
      <ProFormText  name="id" hidden  initialValue ={values.id}/>
      <ProForm.Group>
        渠道名称: <Input  name={values.channelName+"1"}   disabled  value ={values.channelName}/>
        <ProFormSelect
          width="m"
          name="channelType"
          options={[
            {
              value: '0',
              label: '首页',
            },{
              value: '1',
              label: '专栏',
            },
          ]}
          initialValue={values.channelType}
          label="渠道类型"
          placeholder="清选择渠道类型"
          rules={[{ required: true, message: '清选择渠道类型' }]}
        />
        {/*<ProFormSelect*/}
        {/*  width="m"*/}
        {/*  name="type"*/}
        {/*  options={[*/}
        {/*    {*/}
        {/*      value: '0',*/}
        {/*      label: '全国',*/}
        {/*    },{*/}
        {/*      value: '1',*/}
        {/*      label: '分区',*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*  initialValue={values.type}*/}
        {/*  label="所属分类"*/}
        {/*  placeholder="清选择所属分类"*/}
        {/*/>*/}
        <ProFormDateRangePicker name="dateTime" initialValue={[moment(values.startDate), moment(values.endDate)]}label="时间区间" rules={[{ required: true, message: '清选择投放时间' }]}/>
        <ProFormSwitch name="status" label="画面投放状态"  initialValue={values.status=='0'?true:false}/>
        <ProFormTextArea width="m" name="remark" label="备注" placeholder="请输入名称" initialValue={values.remark}
                         rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 ,max:198}]}/>
      </ProForm.Group>
    </ModalForm>
  );
};

export default UpdateFormChannel;
