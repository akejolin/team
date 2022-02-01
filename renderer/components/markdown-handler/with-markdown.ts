import React from 'react';
import Markdown from './'

const OutputComponent = (props) => <Markdown source={props.md} />
export default (md) => OutputComponent({md})