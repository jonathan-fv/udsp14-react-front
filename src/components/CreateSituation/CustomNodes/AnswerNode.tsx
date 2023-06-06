import {memo, useCallback} from "react";
import { Handle, Position } from "reactflow";

const AnswerNode = ({data, isConnectable}: any) => {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div style={{border: '1px solid blue', padding: '10px', width: '400px'}}>
      <Handle type="target" position={Position.Top} style={{ borderRadius: 0 }}  isConnectable={isConnectable} id="a" className="!bg-teal-500" />
      <input type="text" placeholder="Réponse" onChange={onChange}/>
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: 0 }}  isConnectable id="b" className="!bg-teal-500" />
    </div>
  );
};

export default memo(AnswerNode);