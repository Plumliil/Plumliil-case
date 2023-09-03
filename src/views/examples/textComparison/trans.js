export default function convertDiffToHTML(diffHTML) {
  const lines = diffHTML.split("\n");
  let outputHTML = ""; // 输出html
  let change = {}; // 改变行内容
  let curPerch = ""; // 改变行占位符
  let flag = false;
  const newlines = lines.map((item, index) => {
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
      return curPerch;
    } else {
      flag = false;
      return item;
    }
  });
  const uniqueLines = newlines.filter((value, index, self) => {
    if (value.slice(0, 2) !== "@@") {
      return true;
    } else if (value.slice(0, 2) === "@@" && self.indexOf(value) === index) {
      return true;
    } else {
      return false;
    }
  });

  const beforeConHTML = uniqueLines.map((item) => {
    if (change[item]) {
      return change[item]["-"];
    } else {
      return item;
    }
  });
  const afterConHTML = uniqueLines.map((item) => {
    if (change[item]) {
      return change[item]["+"];
    } else {
      return item;
    }
  });
  //   console.log({
  //     beforeConHTML: beforeConHTML.join("\n"),
  //     afterConHTML: afterConHTML.join("\n"),
  //   });
  //   return outputHTML;
  return {
    beforeConHTML,
    afterConHTML,
  };
  //   return {
  //     beforeConHTML: beforeConHTML.join("\n"),
  //     afterConHTML: afterConHTML.join("\n"),
  //   };
}

// const diffHTML = `
//   <div style="width:595.25pt;margin-bottom:68.05pt;margin-top:68.05pt;margin-left:70.85pt;margin-right:70.85pt;">
//     <p style="text-align:center;white-space:pre-wrap;"><span
//   @@ -12,1 +11,1 @@
//   -     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文档修订记</span></p>
//   +     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文档修订记录</span></p>
//   </div>
//   <div style="width:595.25pt;margin-bottom:68.05pt;margin-top:68.05pt;margin-left:70.85pt;margin-right:70.85pt;">
//     <p style="text-align:center;white-space:pre-wrap;"><span
//   @@ -15,1 +14,1 @@
//   -     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文记</span></p>
//   +     style="font-family:'黑体';font-size:10.0pt;white-space:pre-wrap;">文记录</span></p>
//   </div>
//   `;

// convertDiffToHTML(diffHTML);
