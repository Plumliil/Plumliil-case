import { Card, Dropdown, MenuProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import "./styles.less";
type CodeAreaProps = {
  value: string;
  isRead: boolean;
  onChange?: (...args: any) => void;
  cardStyles?: React.CSSProperties;
  disabled?: boolean;
  codeStyles?: React.CSSProperties;
};
function CodeArea(props: CodeAreaProps) {
  const [codeValue, setCodeValue] = useState(props.value);
  const [readState, setReadState] = useState<boolean>();
  const items: MenuProps["items"] = [
    {
      label: "复制内容",
      key: "1",
      onClick: (e: any) => {
        console.log("复制内容", {
          e,
          navigator,
        });
        navigator.clipboard.writeText(codeValue);
        // e.clipboardData.setData("text/plain", codeValue);
        // e.preventDefault();
      },
    },

    {
      label: "清除区域",
      key: "3",
      onClick: (e: any) => {
        setCodeValue("");
        console.log("清除区域", e);
      },
    },
  ];
  !props.isRead &&
    items.push({
      label: "粘贴内容",
      key: "2",
      onClick: async (e: any) => {
        const data = await navigator.clipboard.readText();
        setCodeValue(codeValue + data);
      },
    });
  useEffect(() => {
    setReadState(props.isRead);
  }, [props.isRead]);
  useEffect(() => {
    setCodeValue(props.value);
  }, [props.value]);
  const readAreaStyles: React.CSSProperties = {};
  return (
    <Card
      bodyStyle={{ padding: "10px 10px", width: "500px", ...props.cardStyles }}
    >
      <Dropdown menu={{ items }} trigger={["contextMenu"]}>
        {readState ? (
          <textarea readOnly className="textarea readArea" value={codeValue} />
        ) : (
          <TextArea
            className="textarea writeArea"
            value={codeValue}
            style={{
              resize: "none",
              minHeight: "650px",
              minWidth: "480px",
            }}
            disabled
            onChange={(e) => {
              setCodeValue(e.target.value);
              props.onChange && props.onChange(e);
            }}
          />
        )}
      </Dropdown>
    </Card>
  );
}

export default CodeArea;
