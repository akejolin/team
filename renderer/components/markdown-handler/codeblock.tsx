
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// You can find more themes in >> 'node_modules/react-syntax-highlighter/dist/esm/styles/prism/';
import theme from './gh-colors';

const CodeBlock = (props: {
  showLineNumbers?: boolean,
  language?: string,
  value?: string,
}) => {
  const { language, value } = props
  const [lang] = useState(language);
  const [val] = useState(value);
  return (
    <SyntaxHighlighter language={lang} style={theme} showLineNumbers={props.showLineNumbers || false}>
      {val}
    </SyntaxHighlighter>
  );
}
CodeBlock.defaultProps = {
  language: null,
  showLineNumbers: true,
  value: '',
}

export default CodeBlock;