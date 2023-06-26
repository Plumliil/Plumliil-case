// @flow
import { Alert, Button, Card, Collapse, Space, message } from "antd";
import { useState } from "react";
import { Input } from "antd";
import "./styles.less";
import { SendOutlined } from "@ant-design/icons";
type Props = {};

const TYPE_MAP: any = {
  // 数值类型
  TINYINT: "number",
  SMALLINT: "number",
  MEDIUMINT: "number",
  INT: "number",
  BIGINT: "number",
  INTEGER: "number",
  FLOAT: "number",
  DOUBLE: "number",
  DECIMAL: "number",
  // 字符串类型
  CHAR: "string",
  VARCHAR: "string",
  TINYBLOB: "string",
  TINYTEXT: "string",
  BLOB: "string",
  TEXT: "string",
  MEDIUMBLOB: "string",
  MEDIUMTEXT: "string",
  LONGBLOB: "string",
  LONGTEXT: "string",
  // 日期和时间类型
  DATE: "string",
  TIME: "string",
  YEAR: "string",
  DATETIME: "string",
  TIMESTAMP: "string",

  // 小写
  tinyint: "number",
  smallint: "number",
  mediumint: "number",
  int: "number",
  bigint: "number",
  integer: "number",
  float: "number",
  double: "number",
  decimal: "number",
  char: "string",
  varchar: "string",
  tinyblob: "string",
  tinytext: "string",
  blob: "string",
  text: "string",
  mediumblob: "string",
  mediumtext: "string",
  longblob: "string",
  longtext: "string",
  date: "string",
  time: "string",
  year: "string",
  datetime: "string",
  timestamp: "string",
};
const changeType = (arr: string[]) => {
  let preType = arr[1].split("(")[0];
  return TYPE_MAP[preType];
};
const changeName = (arr: string[]) => {
  let preName = arr[0].split("`")[1].split("_");
  return preName
    .map((value, index) => {
      if (index > 0) {
        return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
      }
      return value;
    })
    .join("");
};

const ToTsType = (props: Props) => {
  const { TextArea } = Input;
  const [beforeData, setBeforeData] = useState("");
  const [afterData, setAfterData] = useState("");
  const [title, setTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const { Panel } = Collapse;
  const [flag, setFlag] = useState(true);
  const transHandler = () => {
    if (!beforeData) {
      setIsError(true);
      return message.error({
        content: "SQL语句不能为空 !",
        style: {
          marginTop: "5vh",
          position: "absolute",
          right: 20,
          textAlign: "center",
        },
      });
    }

    let targetValue = beforeData;
    let title = "";
    let res: any = {};
    try {
      const body = targetValue.split("TABLE")[1].split("ENGINE")[0];
      // 带有换行符
      let content = body.split("(   ");
      // firProps 分割属性
      const firProps = content[0].split("\n");
      title = firProps[0];
      firProps.pop();
      firProps.pop();
      firProps.shift();
      // secProps 第一步处理属性
      const secProps = firProps.map((prop) => {
        const props = prop.split(" NULL")[0].trim().split(" ");
        return [props[0], props[1]];
      });
      // thrProps 第二步处理属性
      secProps.map((item) => {
        // @ts-ignore
        res[changeName(item)] = changeType(item);
        return [changeName(item), changeType(item)];
      });
      setIsError(false);
    } catch (error) {
      // message.error("请检查传入格式!");
      setIsError(true);
      message.error({
        content: "请检查传入格式 !",
        style: {
          marginTop: "5vh",
          position: "absolute",
          right: 20,
          textAlign: "center",
        },
      });
    }
    let resStr = JSON.stringify(res, null, 4);
    resStr = resStr.replace(/\"/g, "");
    setAfterData(resStr);
    title = changeName(title.split("(")) + "Props";
    title = title.slice(0, 1).toUpperCase() + title.slice(1);
    setTitle(title);
  };
  const optionalHandler = () => {
    let value = afterData;
    if (flag) {
      value = value.replace(/\:/g, "?:");
    } else {
      value = value.replace(/\?/g, "");
    }
    setFlag(!flag);
    setAfterData(value);
  };
  const copy = async () => {
    const code = document.querySelector(".code");
    const value: any = code?.innerHTML;
    navigator.clipboard.writeText(value).then(
      (res) => {
        message.success({
          content: "复制成功!",
          className: "custom-class",
          style: {
            marginTop: "5vh",
            position: "absolute",
            right: 20,
            textAlign: "center",
          },
        });
      },
      () => {
        message.error({
          content: "复制失败!请检查传入数据格式",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      }
    );
  };
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div style={{ width: "100vw" }}>
      <h3>基本类型转换</h3>
      <Card style={{ width: "80vw", marginLeft: "10vw" }}>
        <Collapse defaultActiveKey={["0"]} onChange={onChange}>
          <Panel header="查看示例" key="1">
            <Alert
              style={{
                marginBottom: 30,
              }}
              message="传入的格式一定要正确(包括但不限于:换行,关键字...)"
              type="warning"
            />
            <Space>
              <TextArea
                value="CREATE TABLE `crm_sale_goal` (
  `id` bigint(20) NOT NULL COMMENT 'ID',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `gender` varchar(255) DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生信息主表';"
                style={{ width: 600, height: 200 }}
                readOnly
                autoSize={{ minRows: 10, maxRows: 10 }}
                onChange={(e) => {
                  setBeforeData(e.target.value);
                }}
              />
              <SendOutlined />
              <TextArea
                className="code"
                value="interface CrmSaleGoalProps {
  id: number,
  name: string,
  gender: string
}"
                disabled
                style={{ width: 600, height: 200 }}
                readOnly
                autoSize={{ minRows: 10, maxRows: 10 }}
              />
            </Space>

            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex", marginTop: 20 }}
            ></Space>
          </Panel>
        </Collapse>
      </Card>
      <Space style={{ width: "80%" }}>
        <Card style={{ width: "46rem", maxHeight: "50rem" }}>
          <TextArea
            value={beforeData}
            autoSize={{ minRows: 20, maxRows: 30 }}
            status={isError ? "error" : ""}
            onChange={(e) => {
              setBeforeData(e.target.value);
            }}
          />
        </Card>
        <div>
          <Button type="primary" onClick={transHandler}>
            转换
          </Button>
          <Button
            disabled={!afterData ? true : false}
            onClick={optionalHandler}
          >
            可选
          </Button>
          <Button
            type="primary"
            disabled={!afterData ? true : false}
            onClick={copy}
          >
            复制
          </Button>
        </div>
        <Card
          className="codeCard"
          style={{ width: "46rem", maxHeight: "50rem" }}
        >
          <TextArea
            className="code"
            value={
              isError
                ? ""
                : afterData
                ? "interface " + title + " " + afterData
                : ""
            }
            disabled={!isEdit}
            autoSize={{ minRows: 20, maxRows: 30 }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default ToTsType;
