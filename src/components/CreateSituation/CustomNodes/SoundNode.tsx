import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import RemoveNodeButton from "./RemoveNodeButton";

const SoundImage = ({data, isConnectable, selected}: any) => {
    const [image, setImage] = useState('Image');
    const onChange = useCallback((evt: any) => {
        setImage(evt.target.value);
        data.label = evt.target.value;
    }, []);

    return (
        <div style={{border: '1px solid red', padding: '10px', width: '100px', position: 'relative', overflow: 'hidden'}}>
            <RemoveNodeButton selected={selected} removeNode={() => console.log('remove node')} />
            <input type={"file"} accept={"audio/*"} onChange={onChange}></input>
            <Handle type="target" position={Position.Right} style={{ borderRadius: 0 }} isConnectable id="b" className="!bg-teal-500 !h-[10px]"/>
        </div>
    );
};

export default memo(SoundImage);