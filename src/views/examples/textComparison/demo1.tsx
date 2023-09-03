import React from "react";
function convertDiffToHTML1(diffHTML: any) {
  const lines = diffHTML.split("\n");
  let outputHTML = ""; // 输出html
  let change: any = {}; // 改变行内容
  let curPerch = ""; // 改变行占位符
  let flag = false;
  const newlines = lines.map((item: any, index: number) => {
    // console.log(index, item)
    if (item.slice(0, 2) === "@@") {
      flag = true;
      curPerch = item;
      change[item] = {};
      // console.log(item)
      return item;
    } else if (flag && (item.slice(0, 1) === "+" || item.slice(0, 1) === "-")) {
      // console.log(curPerch)
      change[curPerch][item.slice(0, 1)] = item.slice(1);
      //   console.log("change", change);
      return curPerch;
    } else {
      flag = false;
      return item;
    }
  });
  const uniqueLines = newlines.filter((value: any, index: any, self: any) => {
    if (value.slice(0, 2) !== "@@") {
      return true;
    } else if (value.slice(0, 2) === "@@" && self.indexOf(value) === index) {
      return true;
    } else {
      return false;
    }
  });

  const beforeConHTML = uniqueLines.map((item: any) => {
    if (change[item]) {
      return change[item]["-"];
    } else {
      return item;
    }
  });
  const afterConHTML = uniqueLines.map((item: any) => {
    console.log(111, item);

    if (change[item]) {
      return change[item]["+"];
    } else {
      return item;
    }
  });
  console.log({ beforeConHTML, afterConHTML });
  //   return outputHTML;
  return { beforeConHTML, afterConHTML };
}
function convertDiffToHTML(diffHTML: string): {
  beforeConHTML: string;
  afterConHTML: string;
} {
  const lines: string[] = diffHTML.split("\n");
  let outputHTML: string = ""; // 输出html
  let change: { [key: string]: { [key: string]: string } } = {}; // 改变行内容
  let curPerch: string = ""; // 改变行占位符
  let flag: boolean = false; // 改变位置

  function addBackgroundColor(
    inputString: string,
    backgroundColor: string,
    color: string
  ) {
    const regex = /style="[^"]*"/g;
    const result = inputString.replace(regex, (match) => {
      return `${match.slice(
        0,
        -1
      )}background-color:${backgroundColor};color:${color};"`;
    });
    return result;
  }
  const newlines: string[] = lines.map((item: string, index: number) => {
    if (item.trim().slice(0, 2) === "@@") {
      flag = true;
      curPerch = item;
      change[item] = {};
      return item;
    } else if (
      flag &&
      (item.trim().slice(0, 1) === "+" || item.trim().slice(0, 1) === "-")
    ) {
      change[curPerch][item.trim().slice(0, 1)] = item.trim().slice(1);
      return curPerch;
    } else {
      flag = false;
      return item;
    }
  });
  // console.log(change, newlines);

  const uniqueLines: string[] = newlines.filter(
    (value: string, index: number, self: string[]) => {
      if (value.trim().slice(0, 2) !== "@@") {
        return true;
      } else if (
        value.trim().slice(0, 2) === "@@" &&
        self.indexOf(value) === index
      ) {
        return true;
      } else {
        return false;
      }
    }
  );

  const beforeConHTML: string[] = uniqueLines.map((item: string) => {
    if (change[item]) {
        return addBackgroundColor(change[item]["-"], "#fee8e9", "#333333");
      // return change[item]["-"];
    } else {
      return item;
    }
  });

  const afterConHTML: string[] = uniqueLines.map((item: string) => {
    if (change[item]) {
      // return change[item]["+"];
        return addBackgroundColor(change[item]["-"], "#ddffdd", "#333333");
    } else {
      return item;
    }
  });
  console.log({
    beforeConHTML,
    afterConHTML,
  });

  return {
    // beforeConHTML,
    // afterConHTML,
    beforeConHTML: beforeConHTML.join("\n"),
    afterConHTML: afterConHTML.join("\n"),
  };
}
// const diffHTML1 = `
// @@ -0,0 +0,0 @@
//  <div style="width:595.25pt;margin-bottom:68.05pt;margin-top:68.05pt;margin-left:70.85pt;margin-right:70.85pt;">
//      <p style="white-space:pre-wrap;"><br /></p>
//      <p style="text-align:center;white-space:pre-wrap;"><span
//              style="font-family:'微软雅黑';font-size:22.0pt;white-space:pre-wrap;">服务管理模块需求说明</span></p>
//      <p style="text-align:center;white-space:pre-wrap;"><span
// @@ -6,1 +6,4 @@
// -            style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">版本：1.0.0</span></p>
// +            style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">版本：1.</span><span
// +            style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">1</span><span
// +            style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">.</span><span
// +            style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">1</span></p>
//      <p style="text-align:center;white-space:pre-wrap;"><br /></p>
//      <p style="text-align:center;white-space:pre-wrap;"><br /></p>
//      <p style="text-align:center;white-space:pre-wrap;"><span
//              style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文档修订记录</span></p>
//      <table class="a1 a4" style="width:497.25pt;border-collapse:collapse;">
//          <tr class="a1 a4">
//              <td class="a1 a4"
//                  style="width:69.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:center;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">日期</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:49.5pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:center;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">版本号</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:71.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:center;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">修订目录</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:143.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:center;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">修订内容</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:57.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:center;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">修订人</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:107.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:center;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">联系电话</span></p>
//              </td>
//          </tr>
//          <tr class="a1 a4">
//              <td class="a1 a4"
//                  style="width:69.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">20230508</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:49.5pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">V1.0</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:71.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;" />
//              </td>
//              <td class="a1 a4"
//                  style="width:143.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">问题单管理、问题卡管理、问题库管理</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:57.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">陈铭俊</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:107.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><span
//                          style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">18955780016</span></p>
//              </td>
//          </tr>
//          <tr class="a1 a4">
//              <td class="a1 a4"
//                  style="width:69.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
// @@ -78,1 +81,2 @@
// -                <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
// +                <p style="text-align:justify;white-space:pre-wrap;"><span
// +                        style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">20230508</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:49.5pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
// @@ -82,1 +86,3 @@
// -                <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
// +                <p style="text-align:justify;white-space:pre-wrap;"><span
// +                        style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">V1.</span><span
// +                        style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">1</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:71.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
// @@ -86,1 +92,1 @@
// -                <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
// +                <p style="text-align:justify;white-space:pre-wrap;" />
//              </td>
//              <td class="a1 a4"
//                  style="width:143.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
// @@ -90,1 +96,2 @@
// -                <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
// +                <p style="text-align:justify;white-space:pre-wrap;"><span
// +                        style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">我是修改后的文件</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:57.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
// @@ -94,1 +101,2 @@
// -                <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
// +                <p style="text-align:justify;white-space:pre-wrap;"><span
// +                        style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">张三</span></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:107.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
// @@ -98,1 +106,3 @@
// -                <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
// +                <p style="text-align:justify;white-space:pre-wrap;"><span
// +                        style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">1</span><span
// +                        style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">3920192010</span></p>
//              </td>
//          </tr>
//          <tr class="a1 a4">
//              <td class="a1 a4"
//                  style="width:69.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:49.5pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:71.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:143.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:57.0pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
//              </td>
//              <td class="a1 a4"
//                  style="width:107.25pt;border-top:0.75px solid #cbcdd1;border-bottom:0.75px solid #cbcdd1;border-left:0.75px solid #cbcdd1;border-right:0.75px solid #cbcdd1;">
//                  <p style="text-align:justify;white-space:pre-wrap;"><br /></p>
//              </td>
//          </tr>
//      </table>
// @@ -128,2 +138,1 @@
// -    <p style="margin-left:42.0pt;text-align:justify;white-space:pre-wrap;"><span
// -            style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">问题单列表-新建问题单</span></p>
// +    <!-- <p /> -->
//  </div>
//   `;
const diffHTML = `
<div style="width:595.25pt;margin-bottom:68.05pt;margin-top:68.05pt;margin-left:70.85pt;margin-right:70.85pt;">
  <p style="text-align:center;white-space:pre-wrap;"><span
@@ -12,1 +11,1 @@  
-     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文档修订记</span></p>
+     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文档修订记录</span></p>
</div>
<div style="width:595.25pt;margin-bottom:68.05pt;margin-top:68.05pt;margin-left:70.85pt;margin-right:70.85pt;">
  <p style="text-align:center;white-space:pre-wrap;"><span
@@ -15,1 +14,1 @@  
-     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文记</span></p>
+     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文记录</span></p>
</div>
`;

// convertDiffToHTML(diffHTML);
const { beforeConHTML, afterConHTML } = convertDiffToHTML(diffHTML);
// console.log({ beforeConHTML, afterConHTML });

const BeforeCon = () => {
  return (
    <div
      style={{ width: "33%" }}
      dangerouslySetInnerHTML={{ __html: beforeConHTML }}
    ></div>
  );
};
const AfterCon = () => {
  return (
    <div
      style={{ width: "33%" }}
      dangerouslySetInnerHTML={{ __html: afterConHTML }}
    ></div>
  );
};
const ContrastCon = () => {
  const htmlCon = `
  --- html管理模块.html
  +++ html管理模块new.html
  @@ -0,0 +0,0 @@
  <div style="width:595.25pt;margin-bottom:68.05pt;margin-top:68.05pt;margin-left:70.85pt;margin-right:70.85pt;">
      <p style="white-space:pre-wrap;"><br /></p>
      <p style="text-align:center;white-space:pre-wrap;"><span
       @@ -4,1 +4,1 @@
        - style="font-family:'微软雅黑';font-size:22.0pt;white-space:pre-wrap;">服务管理说明</span></p>
        + style="font-family:'微软雅黑';font-size:22.0pt;white-space:pre-wrap;">理塘丁真</span></p>
      <p style="text-align:center;white-space:pre-wrap;"><span
       @@ -6,4 +6,2 @@ 
        - style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">版本：1.0.</span><span
        - style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">1</span></p>
        - <p style="text-align:center;white-space:pre-wrap;"><span
        - style="font-family:'微软雅黑';font-size:22.0pt;white-space:pre-wrap;">牛逼</span></p>
        + style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">版本：</span><span +
          style="font-family:'宋体';font-size:22.0pt;white-space:pre-wrap;">6.6.6</span></p>
      <p style="text-align:center;white-space:pre-wrap;"><br /></p>
      @@ -11,0 +9,1 @@
        + <p style="text-align:center;white-space:pre-wrap;"><br /></p>
      <p style="text-align:center;white-space:pre-wrap;"><span
      @@ -12,1 +11,1 @@
        - style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文档修订记</span></p>
        + style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文档修订记录</span></p>
      <p style="text-align:center;white-space:pre-wrap;"><span
      @@ -14,1 +13,1 @@
        - style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">所以，如果你主要关注文本内容的对比，转换为Markdown格式可能更适合，因为Markdown更注重文本本身而不是样式或布局。然而，需要注意的是，转换过程中仍然可能会丢失一些特定的样式或格式，特别是对于复杂的Word文档。因此，在选择转换格式时，最好根据你的具体需求和文档复杂性做出决定。</span>
        + style="font-family:'宋体';font-size:12.0pt;white-space:pre-wrap;">如果你主要关注文本内容的对比，转换为Markdown格式可能更适合，因为Markdown更注重文本本身而不是样式或布局。然而，需要注意的是，转换过程中仍然可能会丢失一些特定的样式或格式，特别是对于复杂的Word文档。因此，在选择转换格式时，最好根据你的具体需求和文档复杂性做出决定。</span>
      </p>
  </div>
    `;
  return (
    <div
      style={{ width: "33%" }}
      dangerouslySetInnerHTML={{ __html: htmlCon }}
    ></div>
  );
};

const index = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      {/* <h1>textComparison</h1>
       */}
      <BeforeCon />
      {/* <ContrastCon /> */}
      <AfterCon />
    </div>
  );
};

export default index;
