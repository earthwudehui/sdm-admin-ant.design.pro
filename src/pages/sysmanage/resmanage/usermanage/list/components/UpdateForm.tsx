import React ,{useEffect,useState}from 'react';
import { Form, Button,  Input, Modal, Select, Steps } from 'antd';

import { TableListItem } from '@/services/sysmanageservice/usermanage/data';
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
  const roldValue = await findDictionary("role");
  return roldValue;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {

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
    name: props.values.name,
    password: props.values.password,
    roleId: props.values.roleId,
    realName: props.values.realName,
    mobile: props.values.mobile,
    status: props.values.status,
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
            name="id"
            label="id"
            hidden ={booleanValue}
          >
            <Input placeholder="请输入用户姓名" />
          </FormItem>
          <FormItem
            name="realName"
            label="用户姓名"
            rules={[{ required: true, message: '请输入至少两个字符！' , min: 2}]}
          >
            <Input placeholder="请输入用户姓名" />
          </FormItem>
          <FormItem
            name="mobile"
            label="手机号"
            rules={[{ required: true, message: '请输入至少11个字符！' , min: 1 }]}
          >
            <Input placeholder="请输入手机号" />
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
          name="name"
          label="用户名"
          rules={[{ required: true, message: '请输入至少四个字符！' , min: 4}]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem
          name="password"
          label="用户密码"
          rules={[{ required: true, message: '请输入至少六个字符！' , min: 6 }]}
        >
          <Input placeholder="请输入密码" />
        </FormItem>
        <FormItem
          name="roleId"
          label="角色"
        >
          <Select style={{ width: '100%' }}>
          {children}
          </Select>
        </FormItem>
        <FormItem name="status" label="用户状态">
          <Select style={{ width: '100%' }}>
            <Option value="0">正常</Option>
            <Option value="1">禁用</Option>
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
      title="修改用户信息"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="账号信息" />
        <Step title="用户信息" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          name: formVals.name,
          password: formVals.password,
          roleId: formVals.roleId,
          realName: formVals.realName,
          mobile: formVals.mobile,
          status: formVals.status,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
