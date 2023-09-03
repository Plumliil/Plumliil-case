import ProCard from "@ant-design/pro-card";
import ProForm, {
  ProFormDependency,
  ProFormField,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-form";
import { Card, Col, Empty, Form, Row, Space, message } from "antd";
import { FormLayout } from "antd/lib/form/Form";
import React, { useState } from "react";

const PlumlilTest = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Test</h1>
      <ProForm
        layout={"vertical"}
        style={{
          width: 800,
        }}
        form={form}
        submitter={{
          render: (props, doms) => {
            return (
              <Row>
                <Col span={14} offset={4}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
        onFinish={async (values) => {
          const formDetail = await form.validateFields();
          console.log(formDetail);

          setDataSource(formDetail);
          message.success("提交成功");
        }}
        params={{}}
      >
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          label="标签布局"
          name={"radioGroup"}
          radioType="button"
          options={["horizontal", "vertical", "inline"]}
        />
        <ProFormDependency name={["radioGroup"]}>
          {({ radioGroup }) => {
            if (radioGroup === "horizontal") {
              return (
                <ProFormList
                  name="horizontal_list"
                  initialValue={[{}]}
                  creatorButtonProps={{
                    position: "bottom",
                    creatorButtonText: "新建一行",
                  }}
                  copyIconProps={false}
                  deleteIconProps={{
                    tooltipText: "删除该行",
                  }}
                  actionGuard={{
                    beforeRemoveRow: async (index) => {
                      return new Promise((resolve) => {
                        if (index === 0) {
                          resolve(false);
                          message.info("该行禁止删除");
                          return;
                        }
                        resolve(true);
                      });
                    },
                  }}
                >
                  {(meta, index, action, count) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* 条件展示 */}
                        {!index && (
                          <ProFormSelect
                            valueEnum={{
                              or: "或",
                              and: "且",
                              not: "非",
                            }}
                            name="horizontal_type"
                            label={!index ? "条件" : " "}
                            colon={!index ? true : false}
                            // colProps={{ span: 6 }}
                            // labelCol={{ span: 14 }}
                            // wrapperCol={{ span: 10 }}
                            initialValue={"AND"}
                            readonly={!index}
                            proFieldProps={{
                              render: (val) => {
                                if (!index) return "满足";
                                return val;
                              },
                            }}
                          />
                        )}

                        <ProFormSelect
                          options={[
                            {
                              value: "chapter",
                              label: "盖章后生效",
                            },
                          ]}
                          name="h_condition_1"
                        />
                      </div>
                    );
                  }}
                </ProFormList>
              );
            } else if (radioGroup === "vertical") {
              return (
                <Card title={"vertical"}>
                  <ProFormSelect
                    options={[
                      {
                        value: "chapter",
                        label: "盖章后生效",
                      },
                    ]}
                    width="md"
                    name="v_condition_1"
                  />
                </Card>
              );
            } else if (radioGroup === "inline") {
              return (
                <Card title={"inline"}>
                  <ProFormSelect
                    options={[
                      {
                        value: "chapter",
                        label: "盖章后生效",
                      },
                    ]}
                    width="md"
                    name="i_condition_1"
                  />{" "}
                </Card>
              );
            }
            return <></>;
          }}
        </ProFormDependency>
      </ProForm>
      <ProCard title="表格数据" headerBordered>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </div>
  );
};

export default PlumlilTest;
