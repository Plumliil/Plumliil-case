import { Outlet } from "react-router-dom";
import { Affix, Button, Card, Menu } from "antd";
import "./styles.less";
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
const Layout = () => {
  const items: MenuProps["items"] = [
    {
      label: "Navigation One",
      key: "1",
      icon: <MailOutlined />,
    },
    {
      label: "Navigation One",
      key: "2",
      icon: <MailOutlined />,
    },
    {
      label: "Navigation One",
      key: "3",
      icon: <MailOutlined />,
    },
  ];
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <section id="container">
        <header>
          <Affix offsetTop={0} onChange={(affixed) => console.log(affixed)}>
            <Card className="headBar">
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
              />
            </Card>
          </Affix>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>Footer</footer>
      </section>
    </>
  );
};

export default Layout;
