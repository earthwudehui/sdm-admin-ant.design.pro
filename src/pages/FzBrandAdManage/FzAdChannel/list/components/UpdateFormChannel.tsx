import React from 'react';
import ProForm, {
  ModalForm,
  ProFormTextArea,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import {TableListItem} from "@/services/FzBrandAdManageService/FzProjectAdService/data";

export interface FormValueType extends Partial<TableListItem> {

}
interface UpdateFormChannelProps {
  onCancel: () => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateFormChannel: React.FC<UpdateFormChannelProps> = (props) => {
  const { updateModalVisible, onCancel,onSubmit,values } = props;

  return (
    <ModalForm
      title="修改投放画面"
      width={400}
      visible={updateModalVisible}
      onVisibleChange={() => onCancel()}
      onFinish={ async (values) => onSubmit(values)}
    >
      <ProForm.Group>
        <ProFormText  name="id"    hidden initialValue ={values.id}/>
        <ProFormText width="m" name="adName" label="画面名称" placeholder="请输入名称" initialValue={values.adName}
                     rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 }]}/>
        <ProFormSwitch name="status" label="画面投放状态"  initialValue={values.status=='0'?true:false}/>
        <ProFormTextArea width="m" name="remark" label="备注" placeholder="请输入名称" initialValue={values.remark}
                         rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 ,max:198}]}/>
      </ProForm.Group>
    </ModalForm>
  );
};

export default UpdateFormChannelForm;
