import { MenuProps } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
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
    ],
  },
];

export default menuOptions;
