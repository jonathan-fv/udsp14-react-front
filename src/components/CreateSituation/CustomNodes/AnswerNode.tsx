import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import SelectedNode from "./SelectedNode";

const AnswerNode = ({data, isConnectable, selected}: any) => {
  const [text, setText] = useState(data.label);

  const onChange = useCallback((evt: any) => {
    setText(evt.target.value);
    data.label = evt.target.value;
  }, []);

  const outline = selected ? '2px solid blue' : '0px';

  return (
    <div style={{border: '1px solid blue', padding: '5px', width: '400px', position: 'relative', outline: outline}}>
      <SelectedNode selected={selected} />
      <Handle type="target" position={Position.Top} style={{ borderRadius: 0 }}  isConnectable={isConnectable} id="a" className="!bg-teal-500 !w-[50px]" />
      <textarea className="nodeText" value={text} onChange={onChange}></textarea>
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: 0 }} isConnectable id="b" className="!bg-teal-500 !w-[50px]"/>
    </div>
  );
};

export default memo(AnswerNode);