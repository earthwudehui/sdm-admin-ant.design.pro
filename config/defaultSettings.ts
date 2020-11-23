import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} =
  // {
//   navTheme: 'light',
//   // 拂晓蓝
//   primaryColor: '#1890ff',
//   layout: 'mix',
//   contentWidth: 'Fluid',
//   fixedHeader: false,
//   fixSiderbar: true,
//   colorWeak: false,
//   title: 'Ant Design Pro',
//   pwa: false,
//   logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
//   iconfontUrl: '',
// };
{
  "navTheme": "dark",
  "primaryColor": "#1890ff",
  "layout": "side",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  menu: {
    locale: false,  //关闭国际化
  },
  "fixSiderbar": true,
  "title": "Ant Design Pro",
  "pwa": false,
  "iconfontUrl": ""
};
export default Settings;
