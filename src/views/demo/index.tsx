// @flow
import { Button } from "antd";
import * as React from "react";
type Props = {};

const Foo = React.memo((props: any) => {
  console.log("Foo render");
  return (
    <div>
      <ul>{props.render()}</ul>
    </div>
  );
});
const Demo = (props: Props) => {
  const [range, setRange] = React.useState({ min: 0, max: 10 });
  const [count, setCount] = React.useState(0);
  console.log("APP render");
  // const render = (params: any) => {
  //   let list = [];
  //   console.log("Render Function Action");
  //   for (let i = 0; i < range.max; i++) {
  //     list.push(<li key={i}>{i}</li>);
  //   }
  //   return list;
  // };
  const render = React.useCallback(
    (params: any) => {
      console.log("Render Function Action");

      let list = [];
      console.log(1);
      for (let i = 0; i < range.max; i++) {
        list.push(<li key={i}>{i}</li>);
      }
      return list;
    },
    [range]
  );
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        <h1>+1</h1>
      </button>
      <button
        onClick={() =>
          setRange({
            min: range.min,
            max: range.max + 10,
          })
        }
      >
        <h1>range max +10</h1>
      </button>
      <Foo render={render}></Foo>
    </div>
  );
};

export default Demo;
// 每一次+1函数重新执行
// Foo中render函数也是新的render
// 优化:让每次Foo传入的render是同一引用useCallback

// useCallback 固定一个函数
// useMemo 固定一个值
