import { Modal } from "antd";
import React from "react";

const index = () => {
  return (
    <Modal
      title="ButtonProps 使用"
      visible={true}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okButtonProps={{
        style: {
          color: "white",
          backgroundColor: "pink",
        },
      }}
    >
      <h1>隐藏取消按钮</h1>
    </Modal>
  );
};

export default index;
