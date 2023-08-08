import React from "react";
import { Card, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { data } from "./data";
import { Rgb_Hex } from "liilib";
const columns: ColumnsType<ColorDataType> = [
  {
    title: "color",
    dataIndex: "color",
    key: "color",
    align: "center",
    width: 200,
    render: (value) => {
      const rgb = `rgb(${value[0]},${value[1]},${value[2]})`;
      return (
        <span
          style={{
            display: "inline-block",
            height: "30px",
            width: 200,
            backgroundColor: rgb,
          }}
        ></span>
      );
    },
  },
  {
    title: "rgb",
    dataIndex: "rgb",
    key: "rgb",
    align: "center",
    width: 200,
  },
  {
    title: "hex",
    dataIndex: "hex",
    key: "hex",
    align: "center",
    width: 200,
  },
];

const ColorConversion: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>颜色转换</h3>
      <Card
        bodyStyle={{
          width: "1000px",
        }}
      >
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default ColorConversion;
