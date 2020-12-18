import React, {useEffect, useState} from 'react';
import ProForm, {
  DrawerForm,
  ProFormTextArea,
  ProFormSwitch,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form';
import {TableListItem} from "@/services/FzBrandAdManageService/FzProjectAdService/data";
import {findDictionaryValueEnumByDicname} from "@/services/utile";
import {Form, Input, Select} from 'antd';
import {queryFzBrandProjectByBrandId} from "@/services/FzBrandAdManageService/FzBrandProjectService/service";

export interface FormValueType extends Partial<TableListItem> {

}
interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueType) => void;
  brandId:String;
  brandName:String;
  projectId:String;
  projectName:String;

}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel,onSubmit,brandId,projectId,projectName } = props;

  // const [category,setCategory] = useState<any>();
  // useEffect(() => {
  //   findDictionaryValueEnumByDicname("brand").then(res=>{setCategory(res)})
  // }, []);
  //
  // const [Cities,setCities] = useState<any>();
  // const [secondCity, setSecondCity] = useState<any>();
  //
  // // 品牌选择
  // async function getType(value){
  //   setSecondCity(null);
  //   let res = await queryFzBrandProjectByBrandId(value.value);
  //   setCities(res)//列表字段
  // }
  // // 项目选择
  // const onSecondCityChange = value => {
  //   setSecondCity(value);
  // };
  return (
    <DrawerForm
      title="新建投放画面"
      width={420}
      visible={modalVisible}
      onVisibleChange={() => onCancel()}
      onFinish={ async (values) => onSubmit(values)}
    >

      {/*<Form.Item name="brandId" label="品牌名称" rules={[{ required: true}]}>*/}
      {/*  <Select  labelInValue style={{ width: '90%' }} onChange={getType} options = {category} >*/}
      {/*  </Select>*/}
      {/*</Form.Item>*/}
      {/*<Form.Item name="projectId" label="项目名称" rules={[{ required: true}]}>*/}
      {/*  <Select style={{ width: '90%' }} options = {Cities} value={secondCity} onChange={onSecondCityChange}>*/}
      {/*  </Select>*/}
      {/*</Form.Item>*/}

      <ProForm.Group>

        {/*<ProFormText name={brandName} width="m" disabled label="品牌名称" initialValue={brandName}/>*/}
        <ProFormText name={projectName} width="m" disabled label="项目名称" initialValue={projectName}/>
        <ProFormText  name="brandId"    hidden initialValue ={brandId}/>
        <ProFormText  name="projectId"  hidden  initialValue ={projectId}/>
        <ProFormText width="m" name="adName" label="画面名称" placeholder="请输入名称"
                     rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 }]}/>

        <ProFormSwitch name="status" label="画面投放状态"  />
        <ProFormTextArea width="m" name="remark" label="备注" placeholder="请输入名称" rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 ,max:198}]}/>
      </ProForm.Group>

    </DrawerForm>
  );
};

export default CreateForm;
