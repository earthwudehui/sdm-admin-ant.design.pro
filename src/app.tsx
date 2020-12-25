import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';
/**
 * 此方法会跳转到 redirect 参数所在的位置
 */

const goto = () => {
  const { query } = history.location;
  const { redirect } = query as {
    redirect: string;
  };
  window.location.href = redirect || '/';
};

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  // 记录路由资源
  // 记录可操资源
}> {
  const token = sessionStorage.getItem('token');
  const fetchUserInfo = async () => {
    try {
      if(token==null){
        history.push('/user/login');
      }else{
        const currentUser = await queryCurrent();
        return currentUser;
      }
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  // 如果是登录页，并且token未失效不用再登录
  if(history.location.pathname === '/user/login'&&token!=null) {
    goto();
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login')  {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  441: '登录凭证已失效，请重新登录。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;

  if (response && response.status) {
    // token 失效
    if(response.status ===401||response.status ===403){
      // 目前没有续期操作
      sessionStorage.removeItem("token");// 删除token
    }
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const demoResponseInterceptors = (response: Response, options) => {
// token 失效
    if(response.status ===401||response.status ===441){
      // 目前没有续期操作
      sessionStorage.removeItem("token");// 删除token
      const errorText = codeMessage[response.status] || response.statusText;
      notification.error({
        message: `请求错误`,
        description: errorText,
      });
      history.push('/user/login?redirect='+history.location.pathname);//保留请求跳转
    }
  return response;
}


export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [
    (url: string, options) => {
      options.headers ={
        // token: sessionStorage.getItem('token')
        // Authorization: `Bearer ${sessionStorage.getItem('token')}`
        Authorization: sessionStorage.getItem('token')
      };
      return { url, options };
    }
  ],
  responseInterceptors: [demoResponseInterceptors],
};
