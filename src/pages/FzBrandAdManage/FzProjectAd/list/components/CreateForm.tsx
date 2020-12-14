import React, {useEffect, useState} from 'react';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormSwitch
} from '@ant-design/pro-form';
import {TableListItem} from "@/services/FzBrandAdManageService/FzProjectAdService/data";
import {findDictionaryByProFormSelect, findDictionaryByProFormSelect1} from "@/services/utile";
import {queryFzBrandProjectByBrandId} from "@/services/FzBrandAdManageService/FzBrandProjectService/service";

import { Cascader,Select  } from 'antd';
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

const { Option } = Select;
const provinceData = ['2007101804194321839', '2012101936167248286'];


const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel,onSubmit } = props;
  const [options, setOptions] = React.useState(optionLists);
  const [RoldValue, setRoldValue] = useState();
  const [RoldValue1, setRoldValue1] = useState();

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const children = [];
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

  const [secondCity, setSecondCity] = useState();
  const [cities, setCities] = useState();
  const handleProvinceChange = value => {

    queryFzBrandProjectByBrandId(value).then(res => {
      setRoldValue(res.data)
    });
    // setCities(cityData[value]);
    // setSecondCity(cityData[value][0]);
    // for (let k in RoldValue){
    //   children.push(<Option key={k}>{RoldValue[k]}</Option>);
    // }
  };

  const onSecondCityChange = value => {
    setSecondCity(value);
  };

  return (
    <DrawerForm
      title="新建投放画面"
      width={420}
      visible={modalVisible}
      onVisibleChange={() => onCancel()}
      onFinish={ async (values) => onSubmit(values)}
    >
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


      <Select style={{ width: 120 }} onChange={handleProvinceChange}>
        {provinceData.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select>
      <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
        {RoldValue.map(RoldValue => (
          <Option key={RoldValue}>{RoldValue}</Option>
        ))}
      </Select>

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
