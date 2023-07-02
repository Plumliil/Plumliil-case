import { Button, Card, Dropdown, MenuProps, message } from "antd";
import Tree, { DataNode, TreeProps } from "antd/es/tree";
import React, { useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { CodeArea } from "@/components";
const useTreeHandler = (TreeData: DataNode[]) => {
  const [gData, setGData] = useState(JSON.parse(JSON.stringify(TreeData)));
  /**
   * 插入子级
   * @param key 当前节点key
   * @param newNode 待插入节点
   */
  const insertNodeByKey = function (
    key: string | number | undefined,
    newNode: any
  ) {
    const data = JSON.parse(JSON.stringify(gData));
    const insertChild = (
      data: any[],
      key: string | number | undefined,
      newNode: any
    ): any[] => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          if (Array.isArray(data[i].children)) {
            data[i].children = [...data[i].children, newNode];
          } else {
            data[i].children = [newNode];
          }
          break;
        } else if (Array.isArray(data[i].children)) {
          insertChild(data[i].children, key, newNode);
        }
      }
      return data;
    };
    setGData(insertChild(data, key, newNode));
  };

  /**
   * 插入同级
   * @param key 当前节点key 供查询父key
   * @param newNode 新节点数据
   */
  const insertNodeInParentByKey = function (
    key: string | number | undefined,
    newNode: any
  ) {
    const data = JSON.parse(JSON.stringify(gData));
    const insertBro = (
      data: any[],
      key: string | number | undefined,
      newNode: any
    ) => {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.children) {
          for (let j = 0; j < item.children.length; j++) {
            const childItem = item.children[j];
            if (childItem.key === key) {
              item.children.push(newNode);
              break;
            } else if (childItem.children) {
              insertBro([childItem], key, newNode);
            }
          }
        }
      }
      return data;
    };
    setGData(insertBro(data, key, newNode));
  };
  /**
   * 删除当前节点
   * @param data 源数据
   * @param key 待删除节点key
   */
  const deleteNodeByKey = function (key: string | number | undefined) {
    const data = JSON.parse(JSON.stringify(gData));
    const delNode = (data: any[], key: string | number | undefined) => {
      for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj.key === key) {
          data.splice(i, 1);
          break;
        } else if (obj.children) {
          delNode(obj.children, key);
          if (obj.children.length === 0) {
            delete obj.children;
          }
        }
      }
    };
    delNode(data, key);
    setGData(data);
  };
  /**
   * 根据key查询对应节点
   * @param data 源数据
   * @param key 待查询节点key
   * @returns 对应节点信息
   */
  const findNodeBy = (data: any[], key: string | number | undefined): any => {
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      if (obj.key === key) {
        return obj;
      } else if (obj.children) {
        const result: any = findNodeBy(obj.children, key);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };
  /**
   * 更新子节点配置
   * @param oldData 旧数据
   * @param key 待更新子节点key
   * @param newData 更新后新数据
   */
  const updateTreeDataByKey = function (
    key: string | number | undefined,
    newData: any
  ) {
    const data = JSON.parse(JSON.stringify(gData));
    const updateNode = (
      oldData: any[],
      key: string | number | undefined,
      newData: any[]
    ) => {
      for (let i = 0; i < oldData.length; i++) {
        if (oldData[i].key === key) {
          oldData[i] = { ...oldData[i], ...newData };
          break;
        } else {
          if (Array.isArray(oldData[i].children)) {
            updateNode(oldData[i].children, key, newData);
          }
        }
      }
    };
    updateNode(data, key, newData);
    setGData(data);
  };
  /**
   * 上移/下移
   * @param data 源数据
   * @param key 目标key
   * @param direction 移动类型
   * @returns 更新后数据
   */
  const moveNodeInTreeByKey = function (
    key: string | number | undefined,
    direction: "UP" | "DOWN"
  ) {
    const data = JSON.parse(JSON.stringify(gData));
    const moveNode = (
      data: any[],
      key: string | number | undefined,
      direction: string
    ) => {
      const newData = [...data];
      for (let i = 0; i < newData.length; i++) {
        const item = newData[i];
        const itemLen = item.children.length;
        if (item.children) {
          for (let j = 0; j < itemLen; j++) {
            const childItem = item.children[j];
            if (childItem.key === key) {
              if (j === 0 && direction === "UP")
                // message.info("已经处于第一位,无法上移");
                message.info({
                  content: "已经处于第一位,无法上移",
                  className: "custom-class",
                  style: {
                    marginTop: "5vh",
                    position: "absolute",
                    right: 20,
                    textAlign: "center",
                  },
                });
              if (j === itemLen - 1 && direction === "DOWN")
                // message.info("已经处于最后一位,无法下移");
                message.info({
                  content: "已经处于最后一位,无法下移",
                  className: "custom-class",
                  style: {
                    marginTop: "5vh",
                    position: "absolute",
                    right: 20,
                    textAlign: "center",
                  },
                });
              // splice (开始位置,移除元素个数,新增元素对象)
              if (direction === "UP") {
                item.children.splice(j, 1);
                item.children.splice(j - 1, 0, childItem);
              } else {
                item.children.splice(j, 1);
                item.children.splice(j + 1, 0, childItem);
              }

              break;
            } else if (childItem.children) {
              moveNode([childItem], key, direction);
            }
          }
        }
      }
      return newData;
    };
    setGData(moveNode(data, key, direction));
  };
  return {
    gData,
    insertNodeByKey,
    insertNodeInParentByKey,
    deleteNodeByKey,
    findNodeBy,
    updateTreeDataByKey,
    moveNodeInTreeByKey,
  };
};
const treeData: DataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
          {
            title: "leaf",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: "leaf",
            key: "0-0-1-0",
          },
        ],
      },
      {
        title: "parent 1-2",
        key: "0-0-2",
        children: [
          {
            title: "leaf",
            key: "0-0-2-0",
          },
          {
            title: "leaf",
            key: "0-0-2-1",
          },
        ],
      },
    ],
  },
];
const index = () => {
  const {
    gData,
    insertNodeByKey,
    insertNodeInParentByKey,
    deleteNodeByKey,
    updateTreeDataByKey,
    moveNodeInTreeByKey,
  } = useTreeHandler(treeData);
  const treeNode = useRef<DataNode>();
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {};
  const items: MenuProps["items"] = [
    {
      label: "添加子级",
      key: "insertChild",
      onClick: () => {
        const date = new Date().getTime();
        const newNode: DataNode = {
          title: "child" + date,
          key: "0-0-0-" + date,
        };
        insertNodeByKey(treeNode.current?.key, newNode);
      },
    },
    {
      label: "添加同级",
      key: "insertBro",
      onClick: () => {
        const date = new Date().getTime();
        const newNode: DataNode = {
          title: "bro" + date,
          key: "0-0-0-" + date,
        };
        insertNodeInParentByKey(treeNode.current?.key, newNode);
      },
    },
    {
      label: "删除当前节点",
      key: "delCur",
      onClick: () => {
        deleteNodeByKey(treeNode.current?.key);
      },
    },
    {
      label: "更新当前节点",
      key: "updateCur",
      onClick: () => {
        const date = new Date().getTime();
        const updateData: DataNode = {
          title: "update Node" + date,
          key: "0-0-0-" + date,
        };
        updateTreeDataByKey(treeNode.current?.key, updateData);
      },
    },
    {
      label: "上移当前节点",
      key: "moveUp",
      onClick: () => {
        moveNodeInTreeByKey(treeNode.current?.key, "UP");
      },
    },
    {
      label: "下移当前节点",
      key: "moveDown",
      onClick: () => {
        moveNodeInTreeByKey(treeNode.current?.key, "DOWN");
      },
    },
  ];
  // const [gData, setGData] = useState(treeData);
  return (
    <>
     <h3>自定义hook操作树形数据</h3>
      <Card
        bodyStyle={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Card
          bodyStyle={{
            flex: 1,
            height: "670px",
            width: "500px",
          }}
        >
          <Dropdown menu={{ items }} trigger={["contextMenu"]}>
            <Tree
              showLine
              switcherIcon={<DownOutlined />}
              defaultExpandedKeys={["0-0-0"]}
              onSelect={onSelect}
              treeData={gData}
              onRightClick={({ event, node }) => {
                treeNode.current = node;
              }}
            />
          </Dropdown>
        </Card>
        <CodeArea
          isRead={true}
          value={JSON.stringify(gData, null, 2)}
        ></CodeArea>
      </Card>
    </>
  );
};

export default index;
