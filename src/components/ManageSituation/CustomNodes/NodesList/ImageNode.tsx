import {memo, useCallback, useState} from 'react';
import {Handle, Position} from 'reactflow';
import SelectedNodeIndicator from '../SelectedNodeIndicator';
import imageLogo from '../../../../assets/images/image.png';
import API from "../../../../services/API";

const ImageNode = ({ data, isConnectable, selected }: any) => {
	const inputId = `image-${Date.now()}`;

	// const onChange = useCallback((evt: any) => {
	//     setImage(evt.target.files[0].name);
	//     data.label = evt.target.files[0].name;
	// }, []);
	const [image, setImage] = useState(data.label);

	const [file, setFile] = useState(null);
	const [fileList, setFileList] = useState([]);


	const handleUpload = async (selectedImage: string | Blob) => {
		try {
			const formData = new FormData();
			formData.append('images', selectedImage);
			const response = await API.post('/upload/image', formData);
			return response.data.image_url;
		} catch (error) {
			console.log(error);
		}
	};
	//@ts-ignore
	const onChange = useCallback(async (evt) => {
		const selectedFile = evt.target.files[0];
		if (selectedFile) {
			const id = Date.now();
			setImage(selectedFile.name);
			setFile(selectedFile);

			try {
				data.url = await handleUpload(selectedFile);
				data.label = selectedFile.name;
				data.storeId = id;
			} catch (error) {
				console.log(error)
			}
			console.log(file)
		}
	}, [data]);

	const outline = selected ? '2px solid blue' : '0px';

	// @ts-ignore
	return (
		<div
			style={{
				border: '2px solid #ca8a04',
				padding: '5px',
				position: 'relative',
				outline: outline,
			}}
			className={'w-12 h-12 flex items-center justify-center rounded-full'}
		>
			<SelectedNodeIndicator selected={selected} />
			<label
				htmlFor={inputId}
				className={`inline-block w-5 h-5 rounded-full bg-white ${
					data?.url ? 'cursor-not-allowed' : 'cursor-pointer'
				}`}
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
				disabled={data?.url}
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
