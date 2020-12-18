import React, { useState,useEffect}   from 'react';
import ProForm, {
  DrawerForm,
  ProFormTextArea,
  ProFormSwitch,
  ProFormText, ProFormDateRangePicker, ProFormSelect,
} from '@ant-design/pro-form';
import {TableListItemChannerl} from "@/services/FzBrandAdManageService/FzAdChannelService/data";
import {TableListItem} from "@/services/FzBrandAdManageService/FzProjectAdService/data";
import {findDictionaryValueEnumByDicname} from "@/services/utile";
import { Form, Select, } from 'antd';

export interface FormValueTypeChannerl extends Partial<TableListItemChannerl> {
  dateTime:string
}
interface CreateFormChannelProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueTypeChannerl) => void;
  values: Partial<TableListItem>;
}

const CreateFormChannel: React.FC<CreateFormChannelProps> = (props) => {
  const { modalVisible, onCancel,onSubmit,values } = props;
  const [channelName,setchannelName] = useState<any>();

  // const [category,setCategory] = useState<any>();
  useEffect(() => {
    findDictionaryValueEnumByDicname("channel").then(res=>{setchannelName(res)})
  }, []);

  return (
    <DrawerForm
      title="新增投放渠道"
      width={420}
      visible={modalVisible}
      onVisibleChange={() => onCancel()}
      onFinish={ async (values) => onSubmit(values)}
    >
      <ProForm.Group>
        <ProFormText  name={values.adName} width="m" disabled label="画面名称" initialValue={values.adName}/>
        <ProFormText  name="brandId"    hidden initialValue ={values.brandId}/>
        <ProFormText  name="projectId"  hidden  initialValue ={values.projectId}/>
        <ProFormText  name="adId"  hidden  initialValue ={values.id}/>
      </ProForm.Group>
      < Form.Item name="channelId"  label="渠道名称" rules={[{ required: true}]}>
        <Select  labelInValue style={{ width: '90%' }}  options = {channelName} >
        </Select>
      </ Form.Item>
     <ProForm.Group>
       {/*<ProFormSelect*/}
       {/* width="m"*/}
       {/* name="channelId"*/}
       {/* label="渠道名称"*/}
       {/* request={async () => await findDictionaryValueEnumByDicname("channel")  }*/}
       {/* placeholder="清选择渠道信息"*/}
       {/* rules={[{ required: true, message: '清选择渠道信息' }]}*/}
       {/*/>*/}
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
         label="渠道类型"
         placeholder="清选择渠道类型"
         rules={[{ required: true, message: '清选择渠道类型' }]}
       />
       <ProFormSelect
         width="m"
         name="channelType"
         options={[
           {
             value: '0',
             label: '全国',
           },{
             value: '1',
             label: '分区',
           },
         ]}
         label="所属分类"
         placeholder="清选择所属分类"

       />
       <ProFormDateRangePicker name="dateTime" label="时间区间" rules={[{ required: true, message: '清选择投放时间' }]}/>
       <ProFormTextArea width="m" name="remark" label="备注" placeholder="请输入名称" initialValue={values.remark}
                         rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 ,max:198}]}/>
        <ProFormSwitch  name="status" label="画面投放状态"  />
     </ProForm.Group>
    </DrawerForm>
  );
};

export default CreateFormChannel;
