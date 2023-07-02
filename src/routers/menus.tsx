import { MenuProps } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  HeatMapOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
const menuOptions: MenuProps["items"] = [
  {
    label: "首页",
    icon: <HomeOutlined />,
    key: "/",
  },
  {
    label: "工具集",
    icon: <SettingOutlined />,
    key: "/tools",
    children: [
      {
        label: "建表语句转TS类型",
        key: "/tools/totstype",
      },
      // {
      //   label: "Mock数据",
      //   key: "/tools/mockdata",
      // },
    ],
  },
  {
    label: "示例集",
    icon: <DeploymentUnitOutlined />,
    key: "/examples",
    children: [
      {
        label: "瀑布流",
        key: "/examples/waterfall",
      },
      {
        label: "自定义Hook",
        key: "/examples/myHook",
      },
    ],
  },
  {
    label: "DEMO",
    icon: <HeatMapOutlined />,
    key: "/demo",
  },
];

export default menuOptions;
