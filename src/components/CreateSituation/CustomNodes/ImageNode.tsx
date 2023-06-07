import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import RemoveNodeButton from "./RemoveNodeButton";

const ImageNode = ({data, isConnectable, selected}: any) => {
    const [image, setImage] = useState('Image');
    const onChange = useCallback((evt: any) => {
        setImage(evt.target.files[0].name);
        data.label = evt.target.files[0].name;
    }, []);

    return (
        <div style={{border: '1px solid red', padding: '10px', width: '100px', position: 'relative', overflow: 'hidden'}}>
            <RemoveNodeButton selected={selected} removeNode={() => console.log('remove node')} />
            <input type={"file"} accept={"image/*"} onChange={onChange}></input>
            <Handle type="target" position={Position.Right} style={{ borderRadius: 0 }} isConnectable id="b" className="!bg-teal-500 !h-[10px]"/>
        </div>
    );
};

export default memo(ImageNode);