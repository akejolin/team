import React from 'react';
import Markdown from './'

const OutputComponent = (props:{md:any}) => (<Markdown source={props.md} />)
export default (md) => OutputComponent({md})