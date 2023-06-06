import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import RemoveNodeButton from "./RemoveNodeButton";

const AnswerNode = ({data, isConnectable, selected}: any) => {
  const [text, setText] = useState('Réponse');
  const onChange = useCallback((evt: any) => {
    setText(evt.target.value);
    data.label = evt.target.value;
  }, []);

  return (
    <div style={{border: '1px solid blue', padding: '10px', width: '400px', position: 'relative'}}>
      <RemoveNodeButton selected={selected} removeNode={() => console.log('remove node')} />
      <Handle type="target" position={Position.Top} style={{ borderRadius: 0 }}  isConnectable={isConnectable} id="a" className="!bg-teal-500 !w-[50px]" />
      <textarea className="nodeText" value={text} onChange={onChange}></textarea>
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: 0 }} isConnectable id="b" className="!bg-teal-500 !w-[50px]"/>
    </div>
  );
};

export default memo(AnswerNode);