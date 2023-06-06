import { memo, useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

const QuestionNode = ({data, isConnectable}: any) => {

  const [text, setText] = useState('Question');

  const onChange = useCallback((evt: any) => {
    setText(evt.target.value);
    data.label = evt.target.value;
  }, []);

  return (
    <div style={{border: '1px solid orange', padding: '10px', width: '400px'}}>
      <Handle type="target" position={Position.Top} style={{ borderRadius: 0 }} isConnectable id="a" className="!bg-teal-500"/>
      <textarea className="nodeText" value={text} onChange={onChange}></textarea>
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: 0 }} isConnectable id="b" className="!bg-teal-500"/>
    </div>
  );
};

export default memo(QuestionNode);