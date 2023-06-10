import { memo, useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import SelectedNodeIndicator from '../SelectedNodeIndicator';

import imageLogo from '../../../../assets/images/image.png';

const ImageNode = ({ data, isConnectable, selected }: any) => {
	const inputId = `image-${Date.now()}`;

	// const onChange = useCallback((evt: any) => {
	//     setImage(evt.target.files[0].name);
	//     data.label = evt.target.files[0].name;
	// }, []);
	const [image, setImage] = useState(data.label);

	const [file, setFile] = useState(null);
	const [fileList, setFileList] = useState([]);

	const onChange = useCallback(
		(evt: any) => {
			const selectedFile = evt.target.files[0];
			if (selectedFile) {
				const id = Date.now();
				setImage(selectedFile.name);
				setFile(selectedFile);
				data.label = evt.target.files[0].name;
				data.storeId = id;

				const reader = new FileReader();
				reader.onload = (e) => {
					// @ts-ignore
					const fileData = e.target.result;
					const fileObject = {
						storeId: id,
						name: selectedFile.name,
						type: selectedFile.type,
						size: selectedFile.size,
						data: fileData,
					};
					// @ts-ignore
					setFileList((prevFileList) => [...prevFileList, fileObject]);
				};
				reader.readAsDataURL(selectedFile);
			}
		},
		[data]
	);

	const outline = selected ? '2px solid blue' : '0px';

	return (
		<div
			style={{
				border: '2px solid purple',
				padding: '5px',
				position: 'relative',
				outline: outline,
			}}
			className={'w-12 h-12 flex items-center justify-center rounded-full'}
		>
			<SelectedNodeIndicator selected={selected} />
			<label
				htmlFor={inputId}
				className="inline-block w-5 h-5 rounded-full bg-white cursor-pointer"
			>
				<img src={imageLogo} alt="une icone symbolisant une image" />
			</label>
			{/*<input type={"file"} accept={"image/*"} onChange={onChange}></input>*/}
			<input
				type={'file'}
				id={inputId}
				className={'hidden'}
				accept={'image/*'}
				onChange={onChange}
			></input>
			<Handle
				type="target"
				position={Position.Right}
				style={{ borderRadius: 0 }}
				isConnectable={isConnectable}
				id="b"
				className="!bg-teal-500 !h-[10px]"
			/>
		</div>
	);
};

export default memo(ImageNode);
