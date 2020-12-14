import React, {useEffect, useState} from 'react';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormSwitch
} from '@ant-design/pro-form';
import {TableListItem} from "@/services/FzBrandAdManageService/FzProjectAdService/data";
import {findDictionaryByProFormSelect1, findDictionaryByProFormSelect} from "@/services/utile";
import { Cascader } from 'antd';
import { useRequest } from 'umi';

export interface FormValueType extends Partial<TableListItem> {

}
interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueType) => void;
}
const optionLists = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel,onSubmit } = props;
  const [options, setOptions] = React.useState(optionLists);
  const [RoldValue, setRoldValue] = useState();
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    findDictionaryByProFormSelect1(targetOption.label).then(res => {
      setRoldValue(res.data)
    });
    targetOption.children = RoldValue;
    targetOption.loading = false;
    // setOptions([...options]);
  }
  return (
    <DrawerForm
      title="新建投放画面"
      width={420}
      visible={modalVisible}
      onVisibleChange={() => onCancel()}
      onFinish={ async (values) => onSubmit(values)}
    >
      <ProForm.Group>
        请选择品牌-项目名称
        <Cascader name="brandId"  options={options} loadData={loadData} onChange={onChange} changeOnSelect />

        <ProFormText width="m" name="adName" label="画面名称" placeholder="请输入名称"
                     rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 }]}/>
        <ProFormSwitch name="status" label="画面投放状态"  />
        <ProFormTextArea width="m" name="remark" label="备注" placeholder="请输入名称" rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 ,max:198}]}/>
      </ProForm.Group>

    </DrawerForm>
  );
};

export default CreateForm;
