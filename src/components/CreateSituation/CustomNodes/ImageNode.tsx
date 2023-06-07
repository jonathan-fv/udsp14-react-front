import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import SelectedNode from "./SelectedNode";

const ImageNode = ({data, isConnectable, selected}: any) => {
    const [image, setImage] = useState('Image');
    const onChange = useCallback((evt: any) => {
        setImage(evt.target.files[0].name);
        data.label = evt.target.files[0].name;
    }, []);

    const outline = selected ? '2px solid blue' : '0px';

    return (
      <div style={{border: '1px solid yellow', padding: '5px', width: '400px', position: 'relative', outline: outline }}>
            <SelectedNode selected={selected} />
            <input type={"file"} accept={"image/*"} onChange={onChange}></input>
            <Handle type="target" position={Position.Right} style={{ borderRadius: 0 }} isConnectable={isConnectable} id="b" className="!bg-teal-500 !h-[10px]"/>
        </div>
    );
};

export default memo(ImageNode);