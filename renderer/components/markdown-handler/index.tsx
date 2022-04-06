import React, { useEffect, useState } from "react";

import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import type {Options} from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import CodeBlock from "./codeblock";
import paragraph from "./paragraph";
import image from "./image";
import thematicBreak from "./hr";
import link from "./link";
import {table, tableRow, tableCell, tableBody, tableHead} from "./table";

export default (props: {
  source: string
}) => {
  useEffect(() => {

    const allLinks = document.querySelectorAll('.open-in-os')

    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].addEventListener('click', function(e) {  
        e.preventDefault();
        const href = allLinks[i].getAttribute('href')
        global.ipcRenderer.send('OPEN_FILE_IN_OS', href)
      });
  }

  })

  return (
    <ReactMarkdown
      remarkPlugins={[gfm, rehypeHighlight]}
      children={props.source}
      skipHtml={false}
      components={{
        code: CodeBlock,
        // @ts-ignore: Unreachable code error
        a: link,
        // @ts-ignore: Unreachable code error
        img: image,
        table,
        //tableRow, tableCell, tableBody, tableHead
      }}
    />
  )
}