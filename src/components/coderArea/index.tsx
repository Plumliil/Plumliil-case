import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const code = `
console.log("hello world");
`;

function CodeArea(props: any) {
  return (
    <SyntaxHighlighter language={props.lang} style={atomOneDark}>
      {props.code}
    </SyntaxHighlighter>
  );
}

export default CodeArea;
