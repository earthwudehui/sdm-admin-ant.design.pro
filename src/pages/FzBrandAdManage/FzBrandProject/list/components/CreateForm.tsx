import React from 'react';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormSwitch
} from '@ant-design/pro-form';
import {TableListItem} from "@/services/FzBrandAdManageService/FzBrandProjectService/data";
import {findDictionaryByProFormSelect} from "@/services/utile";

export interface FormValueType extends Partial<TableListItem> {

}
interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueType) => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel,onSubmit } = props;
  return (
    <DrawerForm
      title="新建"
      width={420}
      visible={modalVisible}
      onVisibleChange={() => onCancel()}
      onFinish={ async (values) => onSubmit(values)}
    >
      <ProForm.Group>
        <ProFormSelect
          width="l"
          name="brandId"
          label="品牌"
          // valueEnum={{
          //   2007101804194321839: '佩妮',
          //   2: '已解决',
          // }}onValueChange
          request={async () => await findDictionaryByProFormSelect("brand")}
          placeholder="清选择品牌信息"
          rules={[{ required: true, message: '清选择品牌信息' }]}
        />
        <ProFormText width="m" name="projectName" label="项目名称" placeholder="请输入名称"
                     rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 }]}/>
        <ProFormSwitch name="status" label="项目状态"  />
        <ProFormTextArea width="m" name="remark" label="备注" placeholder="请输入名称" rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 ,max:198}]}/>
      </ProForm.Group>

    </DrawerForm>
  );
};

export default CreateForm;
