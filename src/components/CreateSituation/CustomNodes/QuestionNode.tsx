import { memo } from "react";
import { Handle, Position } from "reactflow";

const QuestionNode = () => {
  return (
    <div style={{border: '1px solid orange', padding: '10px', width: '400px'}}>
      <Handle type="target" position={Position.Top} style={{ borderRadius: 0 }} isConnectable id="a" className="!bg-teal-500"/>
      <div>Question</div>
      <Handle type="source" position={Position.Bottom} style={{ borderRadius: 0 }} isConnectable id="b" className="!bg-teal-500"/>
    </div>
  );
};

export default memo(QuestionNode);