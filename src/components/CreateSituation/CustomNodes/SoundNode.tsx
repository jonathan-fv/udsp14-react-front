import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import SelectedNode from "./SelectedNode";

const SoundImage = ({data, isConnectable, selected}: any) => {
    const [image, setImage] = useState('Image');
    const onChange = useCallback((evt: any) => {
        setImage(evt.target.value);
        data.label = evt.target.value;
    }, []);

    const outline = selected ? '2px solid blue' : '0px';

    return (
        <div style={{border: '1px solid purple', padding: '5px', width: '400px', position: 'relative', outline: outline }}>
            <SelectedNode selected={selected} />
            <input type={"file"} accept={"audio/*"} onChange={onChange}></input>
            <Handle type="target" position={Position.Right} style={{ borderRadius: 0 }} isConnectable={isConnectable} id="b" className="!bg-teal-500 !h-[10px]"/>
        </div>
    );
};

export default memo(SoundImage);