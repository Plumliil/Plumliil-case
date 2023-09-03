import React, { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import { data_01 } from "./data";
import { ExportOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
function classifyProjectsByYearAndClassification(projects: any) {
  const classifiedProjects: any = [];
  for (const project of projects) {
    const yearEntry = classifiedProjects.find(
      (entry: any) => entry.title === project.projectYear
    );
    if (!yearEntry) {
      classifiedProjects.push({
        title: project.projectYear,
        data: {
          isProject: [],
          notProject: [],
        },
      });
    }
    const updatedYearEntry = classifiedProjects.find(
      (entry: any) => entry.title === project.projectYear
    );
    updatedYearEntry.data[project.projectClassification].push(project);
  }

  return classifiedProjects;
}

const DepreciationList = () => {
  const actionRef = useRef<ActionType>();
  const [expandedRowKeys, setExpandedRowKeys] = useState(["2023年度计划"]); // 设置初始展开的行的 key
  const dataSource = classifyProjectsByYearAndClassification(data_01);
  console.log(dataSource);

  const projectContentColumns: ProColumns[] = [
    {
      title: "项目名称",
      dataIndex: "projectName",
      align: "center",
    },
    {
      title: "供应商名称",
      dataIndex: "supplierName",
      align: "center",
    },
    {
      title: "采购单名称",
      dataIndex: "purchaseOrderName",
      align: "center",
    },
    {
      title: "付款申请单号",
      dataIndex: "paymentApplicationNumber",
      align: "center",
    },
    {
      title: "付款申请类型",
      align: "center",
      valueType: "select",
      dataIndex: "paymentRequestType",
    },
    {
      title: "预算科目",
      dataIndex: "budgetAccount",
      valueType: "select",
      align: "center",
    },
    {
      title: "会计科目",
      dataIndex: "ledgerAccount",
      align: "center",
    },
    {
      title: "金额",
      dataIndex: "amount",
      hideInSearch: true,
      align: "center",
    },
    {
      title: "付款状态",
      valueType: "select",
      dataIndex: "paymentStatus",
      align: "center",
    },
    {
      title: "申请日期",
      dataIndex: "dateApplication",
      align: "center",
    },
    {
      title: "截止日期",
      dataIndex: "deadline",
      align: "center",
    },

    {
      title: "操作",
      dataIndex: "options",
      align: "center",
      width: 200,
      render: (_, record) => {
        return (
          <>
            {record.paymentStatus === "未付款" ? (
              <a onClick={() => {}}>申请付款</a>
            ) : (
              "/"
            )}
          </>
        );
      },
    },
  ];
  const yearColumns: ProColumns[] = [
    {
      title: "",
      dataIndex: "title",
      align: "center",
      hideInSearch: true,
      // renderText: () => null,
    },
    {
      title: "项目名称",
      dataIndex: "projectName",
      hideInTable: true,
      align: "center",
      fieldProps: {
        placeholder: "请输入项目名称",
      },
    },
    {
      title: "供应商名称",
      dataIndex: "supplierName",
      valueType: "select",
      hideInTable: true,
      align: "center",
    },
    {
      title: "采购单名称",
      dataIndex: "purchaseOrderName",
      hideInTable: true,
      align: "center",
      fieldProps: {
        placeholder: "请输入采购单名称",
      },
    },
    {
      title: "付款申请单号",
      dataIndex: "paymentApplicationNumber",
      hideInTable: true,
      align: "center",
      fieldProps: {
        placeholder: "请输入编号",
      },
    },
    {
      title: "付款申请类型",
      hideInTable: true,
      align: "center",
      dataIndex: "paymentRequestType",
    },
    {
      title: "预算科目",
      dataIndex: "budgetAccount",
      hideInTable: true,
      valueType: "select",
      align: "center",
    },

    {
      title: "付款状态",
      dataIndex: "paymentStatus",
      hideInTable: true,
      valueType: "select",
      align: "center",
    },
    {
      title: "申请日期",
      dataIndex: "dateApplication",
      hideInTable: true,
      align: "center",
      valueType: "date",
      fieldProps: {
        placeholder: "请选择截止日期",
      },
    },
  ];
  const projectClassColumns: ProColumns[] = [
    {
      title: "",
      dataIndex: "title",
      align: "center",
    },
  ];

  const projectContentRender = (params: any) => {
    const { record1, data1 } = params;
    console.log({ record1, data1 });

    return (
      <ProTable
        className="expandedTable"
        style={{
          marginLeft: "20px",
        }}
        scroll={{ x: "max-content" }}
        columns={projectContentColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data1[record1.type]}
        pagination={false}
      />
    );
  };
  const projectClassRender = (params: any) => {
    const { record } = params;
    console.log("record", record);

    return (
      <>
        <ProTable
          style={{
            marginLeft: "20px",
          }}
          rowKey="title"
          scroll={{ x: "max-content" }}
          columns={projectClassColumns}
          expandable={{
            defaultExpandAllRows: true,
            expandedRowRender: (record1) =>
              projectContentRender({ record1, data1: record.data }),
          }}
          headerTitle={false}
          search={false}
          options={false}
          dataSource={
            record.data.length !== 0
              ? [
                  {
                    title: "2023年项目类计划",
                    data: record.data.isProject,
                    type: "isProject",
                  },
                  {
                    title: "2023年非项目类计划",
                    data: record.data.notProject,
                    type: "notProject",
                  },
                ]
              : []
          }
          pagination={false}
        />
        {record.data.length > 0 && (
          <p
            style={{
              textAlign: "right",
              marginRight: 10,
            }}
          >
            2023-07-01~2023-07-30 计应387250元，已付款267250元
          </p>
        )}
      </>
    );
  };

  return (
    <ProTable
      actionRef={actionRef}
      columns={yearColumns}
      search={{
        labelWidth: 120,
      }}
      scroll={{ x: "max-content" }}
      headerTitle={
        <>
          <Button type="primary">新建</Button>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ExportOutlined />
            导出
          </Button>
        </>
      }
      dataSource={dataSource}
      rowKey="title"
      expandable={{
        expandedRowKeys,
        expandedRowRender: (record) => projectClassRender({ record }),
        onExpand: (expanded, record) => {
          const keys = expanded
            ? [...expandedRowKeys, record.title]
            : expandedRowKeys.filter((key) => key !== record.title);
          console.log("expanded", expanded);

          setExpandedRowKeys(keys);
        },
      }}
      dateFormatter="string"
      pagination={false}
    />
  );
};

export default DepreciationList;
