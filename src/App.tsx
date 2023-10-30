import { useState } from "react";
import type { ReactElement } from "react";
import routes from "./routers";
import { Affix, Card, Menu } from "antd";
import type { MenuProps } from "antd";

import { useNavigate, useRoutes } from "react-router-dom";
import "./App.less";
import menuOptions from "./routers/menus";
interface RouteItemProps {
  label: string;
  key: string;
}
export interface LayoutPropsType {
  home?: string;
  routes: RouteItemProps[];
  styles?: React.CSSProperties;
  element?: ReactElement;
}

function App() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(e.key);
    setCurrent(e.key);
  };
  const GetRouters = () => useRoutes(routes);
  return (
    <>
      <section id="container">
        <header>
          <Affix offsetTop={0}>
            <Card style={{zIndex:99999}} className="headBar">
              <Menu
                style={{
                  height: 40,
                  width: "380px",
                  lineHeight: "40px",
                  zIndex: 99999
                }}
                defaultOpenKeys={["demo"]}
                subMenuCloseDelay={0.3}
                forceSubMenuRender={true}
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={menuOptions}
              />
            </Card>
          </Affix>
        </header>
        <main>
          <div id="vue-micro"></div>
          <div id="react-micro"></div>
          <GetRouters></GetRouters>
        </main>
        <footer>
          <Card className="footBar">
            联系方式&nbsp;&nbsp;&nbsp;&nbsp;plumliil@outlook.com
          </Card>
        </footer>
      </section>
    </>
  );
}

export default App;
