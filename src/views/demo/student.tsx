import React, { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import { data } from "./data";
import { ProCard, ProFormField, ProTable } from "@ant-design/pro-components";
function classifyProjectsByYearAndClassification(projects: any) {
  const classifiedProjects: any = [];
  for (const project of projects) {
    const yearEntry = classifiedProjects.find(
      (entry: any) => entry.title === project.grade
    );
    if (!yearEntry) {
      classifiedProjects.push({
        title: project.grade,
        data: {
          one: [],
          two: [],
          three: [],
        },
      });
    }
    const updatedYearEntry = classifiedProjects.find(
      (entry: any) => entry.title === project.grade
    );
    updatedYearEntry.data[project.class].push(project);
  }

  return classifiedProjects;
}

const StudentList = () => {
  const actionRef = useRef<ActionType>();
  const [expandedRowKeys, setExpandedRowKeys] = useState(["高二"]); // 设置初始展开的行的 key
  const dataSource = classifyProjectsByYearAndClassification(data);
  console.log(dataSource);

  const studentColumns: ProColumns[] = [
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "语文",
      dataIndex: "subjectYuWen",
      align: "center",
    },
    {
      title: "数学",
      dataIndex: "subjectShuXue",
      align: "center",
    },
    {
      title: "英语",
      dataIndex: "subjectYingYu",
      align: "center",
    },
    {
      title: "排名",
      align: "center",
      dataIndex: "ranking",
    },
    {
      title: "班级",
      dataIndex: "class",
      valueType: "select",
      align: "center",
      render: (val) => {
        return val === "one" ? "一班" : val === "two" ? "二班" : "三班";
      },
    },
    {
      title: "年级",
      dataIndex: "grade",
      align: "center",
      valueType: "select",
    },
  ];
  const gradeColumns: ProColumns[] = [
    {
      title: "",
      dataIndex: "title",
      align: "center",
      hideInSearch: true,
    },
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
      hideInTable: true,
    },
    {
      title: "语文",
      dataIndex: "subjectYuWen",
      align: "center",
      hideInTable: true,
    },
    {
      title: "数学",
      dataIndex: "subjectShuXue",
      align: "center",
      hideInTable: true,
    },
    {
      title: "英语",
      dataIndex: "subjectYingYu",
      align: "center",
      hideInTable: true,
    },
    {
      title: "排名",
      align: "center",
      dataIndex: "ranking",
      hideInTable: true,
    },
    {
      title: "班级",
      dataIndex: "class",
      valueType: "select",
      align: "center",
      hideInTable: true,
      render: (val) => {
        return val === "one" ? "一班" : val === "two" ? "二班" : "三班";
      },
    },
    {
      title: "年级",
      dataIndex: "grade",
      align: "center",
      hideInTable: true,
      valueType: "select",
    },
  ];
  const classColumns: ProColumns[] = [
    {
      title: "",
      dataIndex: "title",
      align: "center",
    },
  ];
  const studentRender = (params: any) => {
    const { record1, data1 } = params;
    console.log({ record1, data1 });
    return (
      <ProTable
        className="expandedTable"
        scroll={{ x: "max-content" }}
        columns={studentColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={data1[record1.type]}
        pagination={false}
      />
    );
  };
  const classRender = (params: any) => {
    const { record } = params;
    console.log("record", record.data.three);

    return (
      <>
        <ProTable
          rowKey="title"
          scroll={{ x: "max-content" }}
          columns={classColumns}
          expandable={{
            defaultExpandAllRows: true,
            expandedRowRender: (record1) =>
              studentRender({ record1, data1: record.data }),
          }}
          headerTitle={false}
          search={false}
          options={false}
          dataSource={[
            {
              title: "一班",
              data: record.data.one,
              type: "one",
            },
            {
              title: "二班",
              data: record.data.two,
              type: "two",
            },
            {
              title: "三班",
              data: record.data.three,
              type: "three",
            },
          ].filter((item) => item.data.length > 0)}
          pagination={false}
        />
        {record.data.length > 0 && (
          <p
            style={{
              textAlign: "right",
              marginRight: 10,
            }}
          ></p>
        )}
      </>
    );
  };
  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={gradeColumns}
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: "max-content" }}
        dataSource={dataSource}
        rowKey="title"
        expandable={{
          expandedRowKeys,
          expandedRowRender: (record) => classRender({ record }),
          onExpand: (expanded, record) => {
            const keys = expanded
              ? [...expandedRowKeys, record.title]
              : expandedRowKeys.filter((key) => key !== record.title);
            setExpandedRowKeys(keys);
          },
        }}
        dateFormatter="string"
        pagination={false}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(data)}
        />
      </ProCard>
    </>
  );
};

export default StudentList;
