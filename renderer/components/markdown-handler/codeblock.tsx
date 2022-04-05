
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// You can find more themes in >> 'node_modules/react-syntax-highlighter/dist/esm/styles/prism/';
//import theme from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
//import dark from './gh-colors';
interface Props {
  [key: string]: any
}

const CodeBlock = ({node, inline, className, children, ...props}:Props) => {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      style={theme}
      language={match[1]}
      PreTag="pre"
      {...props}
    />
  ) : (
    <code className={`code-in-line${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </code>
  )
}

/*
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
*/

export default CodeBlock; 