import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import SelectedNode from "./SelectedNode";
import imageLogo from "../../../assets/images/image.png";

const ImageNode = ({data, isConnectable, selected}: any) => {
    const [image, setImage] = useState('Aucune image sélectionnée');
    const onChange = useCallback((evt: any) => {
        setImage(evt.target.files[0].name);
        data.label = evt.target.files[0].name;
    }, []);

    const outline = selected ? '2px solid blue' : '0px';

    return (
        <div  style={{border: '2px solid purple', padding: '5px', position: 'relative', outline: outline }} className={"w-12 h-12 flex items-center justify-center rounded-full"}>
            <SelectedNode selected={selected} />
            <label htmlFor="image-upload"
                       className="inline-block w-5 h-5 rounded-full bg-white cursor-pointer">
                    <img src={imageLogo} alt="une icone symbolisant une image" />
                </label>
            <input type={"file"} id="image-upload" className={"hidden"} accept={"image/*"} onChange={onChange}></input>
            <Handle type="target" position={Position.Right} style={{ borderRadius: 0 }} isConnectable={isConnectable} id="b" className="!bg-teal-500 !h-[10px]"/>
        </div>
        // <div  style={{border: '2px solid purple', padding: '5px', position: 'relative', outline: outline }} className={"w-12 h-12 flex items-center justify-center rounded-full"}>
        //     <SelectedNode selected={selected} />
        //     <label htmlFor="file-upload"
        //            className="inline-block w-5 h-5 rounded-full bg-white cursor-pointer">
        //         <img src={imageLogo} alt="une icone symbolisant une image" />
        //     </label>
        //     <input type="file" id="file-upload" className="hidden" accept={"image/*"} onChange={onChange}/>
        //     <Handle type="target" position={Position.Right} style={{ borderRadius: 0 }} isConnectable={isConnectable} id="b" className="!bg-teal-500 !h-[10px]"/>
        // </div>
    );
};

export default memo(ImageNode);