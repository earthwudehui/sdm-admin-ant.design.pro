import React ,{useEffect,useState}from 'react';
import { Form, Button,  Input, Modal, Select, Steps } from 'antd';

import { TableListItem } from '@/services/FzBrandAdManageService/FzProjectAdService/data';
import {findDictionary} from "@/services/utile";

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const findRoldValue = async () => {
  const roldValue = await findDictionary("brand");
  return roldValue;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { TextArea } = Input;
  // 处理字典
  const [RoldValue, setRoldValue] = useState();
  const booleanValue = true;// 去除红线
  const children = [];
  useEffect(() => {
    findRoldValue().then(res=>{setRoldValue(res.data)})
  }, []);
  for (let k in RoldValue){
    children.push(<Option key={k}>{RoldValue[k]}</Option>);
  }



  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    projectName: props.values.projectName,
    brandId: props.values.brandId,
    status: props.values.status,
    remark: props.values.remark,

  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 1) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem
            name="projectName"
            label="项目名称"
            rules={[{ required: true, message: '请输入至少四个字符！' , min: 4}]}
          >
            <Input placeholder="请输入项目名称" />
          </FormItem>
          <FormItem name="status" label="用户状态">
            <Select style={{ width: '100%' }}>
              <Option value="0">正常</Option>
              <Option value="1">禁用</Option>
            </Select>
          </FormItem>
          <FormItem
            name="remark"
            label="备注"
            rules={[{ required: true, message: '请输入至少四个字符！' , min: 4 ,max:198}]}
          >
            <TextArea rows={4} placeholder="请输入备注" />
          </FormItem>
        </>
      );
    }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //
    //     </>
    //   );
    // }
    return (
      <>
        <FormItem
          name="id"
          label="id"
          hidden ={booleanValue}
        >
          <Input placeholder="请输入用户姓名" />
        </FormItem>
        <FormItem
          name="brandId"
          label="品牌"
        >
          <Select style={{ width: '100%' }}>
            {children}
          </Select>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
    //   return (
    //     <>
    //       <Button style={{ float: 'left' }} onClick={backward}>
    //         上一步
    //       </Button>
    //       <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         下一步
    //       </Button>
    //     </>
    //   );
    // }
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改信息"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="所属品牌" />
        <Step title="项目信息" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          brandId: formVals.brandId,
          projectName: formVals.projectName,
          status: formVals.status,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
