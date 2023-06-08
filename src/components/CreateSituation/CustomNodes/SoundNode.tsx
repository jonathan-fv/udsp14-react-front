import {memo, useCallback, useState} from "react";
import { Handle, Position } from "reactflow";
import SelectedNode from "./SelectedNode";
import soundLogo from "../../../assets/images/music.png"

const SoundImage = ({data, isConnectable, selected}: any) => {
    const [image, setImage] = useState('Aucun son sélectionné');
    const onChange = useCallback((evt: any) => {
        setImage(evt.target.value);
        data.label = evt.target.value;
    }, []);

    const outline = selected ? '2px solid blue' : '0px';

    return (
        <div  style={{border: '2px solid purple', padding: '5px', position: 'relative', outline: outline }} className={"w-12 h-12 flex items-center justify-center rounded-full"}>
            <SelectedNode selected={selected} />
            {/*<input type={"file"} accept={"audio/*"} onChange={onChange}></input>*/}
            <label htmlFor="file-upload"
                   className="inline-block w-5 h-5 rounded-full bg-white cursor-pointer">
                <img src={soundLogo} alt="une icone symbolisant une note de musique" />
            </label>
            <input type="file" id="file-upload" className="hidden" accept="audio/*" onChange={onChange}/>
            <Handle type="target" position={Position.Right} style={{ borderRadius: 0 }} isConnectable={isConnectable} id="b" className="!bg-teal-500 !h-[10px]"/>
        </div>
    );
};

export default memo(SoundImage);