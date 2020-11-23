import React ,{useEffect,useState}from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
import { TableListItem } from '@/services/sysmanageservice/usermanage/data';
import {findDictionary} from "@/services/utile";

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const findRoldValue = async () => {
  const roldValue = await findDictionary("role");
  return roldValue;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [RoldValue, setRoldValue] = useState();
  const booleanValue = true;// 去除红线
  useEffect(() => {
    findRoldValue().then(res=>{setRoldValue(res.data)})
  }, []);
  return(
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title="修改用户信息"
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => props.onCancel()}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          id: props.values.id,
          name: props.values.name,
          password: props.values.password,
          roleId: props.values.roleId,
        }}
        title="账号信息"
      >
        <ProFormText
          name="id"
          hidden={booleanValue}
        />
        <ProFormText
          name="name"
          label="用户名"
          placeholder="请输入至少五个字符"
          rules={[{ required: true, message: '请输入用户名！' , min: 5}]}
        />
        <ProFormText
          name="password"
          label="用户密码"
          placeholder="请输入至少六个字符"
          rules={[{  message: '请输入至少五个字符的规则描述！', min: 6 }]}
        />

        <ProFormSelect
          name="roleId"
          label="角色"
          valueEnum={RoldValue}
        />

      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          realName: props.values.realName,
          mobile: props.values.mobile,
        }}
        title="用户信息"
      >
        <ProFormText
          name="realName"
          label="用户姓名"
          rules={[{ required: true, message: '请输入用户姓名！' }]}
        />
        <ProFormText
          name="mobile"
          label="手机号"
          placeholder="请输入至少11个字符"
          rules={[{ required: true, message: '请输入至少11个字符的规则描述！', min: 11  }]}
        />

      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          status: props.values.status,
        }}
        title="用户账号状态"
      >
        <ProFormSelect
          name="status"
          label="用户状态"
          valueEnum={{
            0: '正常',
            1: '禁用',
          }}
        />
      </StepsForm.StepForm>
    </StepsForm>
  )
}
export default UpdateForm;
