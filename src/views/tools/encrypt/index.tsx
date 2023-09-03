import React, { ReactNode, useEffect, useState } from "react";
import { Button, Card, Tabs, message } from "antd";
import { CodeArea } from "@/components";
import TextArea from "antd/es/input/TextArea";
import request from "@/utils/request";

type Tab = {
  label: string;
  key: string;
  children: ReactNode;
};

const getEncryptStr = async (urlType: string, params: any) => {
  return request.post("/api/encrypt/" + urlType, {
    data: params,
  });
};
const tabs: Tab[] = [
  {
    label: "DES",
    key: "2",
    children: <h1>DES</h1>,
  },
  {
    label: "Rabbit",
    key: "3",
    children: <h1>DES</h1>,
  },
  {
    label: "RC4",
    key: "4",
    children: <h1>DES</h1>,
  },
  {
    label: "TripleDES",
    key: "5",
    children: <h1>DES</h1>,
  },
];

const MockData = () => {
  const [beforeValue, setBeforeValue] = useState("");
  const [afterValue, setAfterValue] = useState("");

  const getEncodeData = async () => {
    const res = await getEncryptStr("encode", {
      target: "target",
      appId: "key",
      type: "AES" + "encode",
    });
    console.log(res);
  };
  const getDecodeData = async () => {
    getEncryptStr("decode", {
      target: "target",
      appId: "key",
      type: "AES" + "decode",
    });
  };
  return (
    <div>
      <h3>加解密</h3>
      <Card>
        <Tabs
          defaultActiveKey="1"
          tabPosition={"top"}
          style={{ height: 220 }}
          items={[
            {
              label: "AES",
              key: "1",
              children: (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CodeArea
                    isRead={false}
                    onChange={(e) => {
                      console.log(e.target.value);

                      setBeforeValue(e.target.value);
                    }}
                    value={beforeValue}
                    disabled
                  />
                  <Button type="primary" onClick={getEncodeData}>
                    加密
                  </Button>
                  <Button type="primary" onClick={getDecodeData}>
                    解密
                  </Button>
                  <CodeArea isRead={true} value={afterValue} disabled />
                </div>
              ),
            },
            ...tabs,
          ]}
        />
      </Card>
    </div>
  );
};

export default MockData;
