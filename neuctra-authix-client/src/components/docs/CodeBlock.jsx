import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl  } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language = "javascript" }) => (
  <SyntaxHighlighter
    language={language}
    style={nightOwl}
    customStyle={{
      borderRadius: "8px",
      padding: "16px",
      fontSize: "14px",
    }}
  >
    {code.trim()}
  </SyntaxHighlighter>
);

export default CodeBlock;
