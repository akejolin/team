import React, { useEffect, useState } from "react";

import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import type {Options} from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import CodeBlock from "./codeblock";
import paragraph from "./paragraph";
import image from "./image";
import thematicBreak from "./hr";
import {table, tableRow, tableCell, tableBody, tableHead} from "./table";

export default (props: {
  source: string
}) => {
  useEffect(() => {})

  return (
    <ReactMarkdown
      remarkPlugins={[gfm, rehypeHighlight]}
      children={props.source}
      skipHtml={false}
      components={{
        code: CodeBlock,
      }}
    />
  )
}