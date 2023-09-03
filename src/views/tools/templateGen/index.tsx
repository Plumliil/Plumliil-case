import { CodeArea } from "@/components";
import request from "@/utils/request";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Card } from "antd";
import { useRef, useState } from "react";

const getTpl = async (params: any) => {
  return request.get("/api/template/TwTablePage", {
    params,
  });
};

type CusDataType = {
  url: string;
  id: number;
  number: number;
  title: string;
  hideInSearch: true;
  align: "center";
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};
const test: CusDataType = {
  title: "test",
  hideInSearch: true,
  align: "center",
  state: "true",
  url: "",
  id: 0,
  number: 0,
  labels: [
    {
      name: "test",
      color: "pink",
    },
  ],
  comments: 0,
  created_at: "221",
  updated_at: "1122",
};
type ConfigType = {
  title: string;
  dataIndex: string;
  valueType?: string;
};
const config: ConfigType[] = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "状态",
    dataIndex: "state",
  },
  {
    title: "标签",
    dataIndex: "tag",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    valueType: "dataPicker",
  },
];
let COLUMN = [];
for (let item of config) {
  COLUMN.push({
    hideInSearch: true,
    align: "center",
    ...item,
  });
}
// console.log("COLUMN", COLUMN);

const columns: any[] = [
  ...COLUMN,
  {
    title: "操作",
    hideInSearch: true,
    align: "center",
    valueType: "option",
    key: "option",
    width: 120,
    render: (text: any, record: any, _: any, action: any) => [
      <Button
        key="editablePage"
        type="link"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </Button>,
      <Button
        key="editablePage"
        type="link"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        删除
      </Button>,
    ],
  },
];

const TemplateGen = () => {
  const [columns, setColumns] = useState("");
  return (
    <div>
      <h3>模板生成</h3>
      <Card
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="primary"
          onClick={async () => {
            const data = {
              ComponentName: "MyComp",
            };
            window.open("http://localhost:3000/template/TwTablePage", "_blank");
          }}
        >
          TwTablePage
        </Button>
        {/* <ProTable
          rowKey="id"
          columns={columns}
          actionRef={actionRef}
          search={{
            labelWidth: "auto",
          }}
          request={getListData}
          editable={{
            type: "multiple",
          }}
          //   toolbar={{
          //     settings: null,
          //   }}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
          }}
          headerTitle={
            <>
              <Button type="primary" onClick={() => {}}>
                新建
              </Button>
            </>
          }
          dateFormatter="string"
        /> */}
      </Card>
    </div>
  );
};
export default TemplateGen;
