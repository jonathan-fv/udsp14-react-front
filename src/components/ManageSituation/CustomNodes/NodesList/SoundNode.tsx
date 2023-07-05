import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import SelectedNodeIndicator from '../SelectedNodeIndicator';
import soundLogo from '../../../../assets/images/music.png';
import API from '../../../../services/API';

const SoundImage = ({ data, isConnectable, selected }: any) => {
	const inputId = `input-${Date.now()}`;
	//const [image, setImage] = useState('Aucun son sélectionné');

	const handleUpload = async (selectedImage: string | Blob) => {
		try {
			const formData = new FormData();
			formData.append('audios', selectedImage);
			console.log(formData);
			const response = await API.post('/upload/audio', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			return response.data.image_url;
		} catch (error) {
			console.log(error);
		}
	};

	const onChange = useCallback(
		async (evt: any) => {
			const selectedFile = evt.target.files[0];
			try {
				data.url = await handleUpload(selectedFile);
				data.label = selectedFile.name;
			} catch (error) {
				console.log(error);
			}
		},
		[data]
	);

	const outline = selected ? '2px solid blue' : '0px';

	return (
		<div
			style={{
				border: '2px solid #9333ea',
				padding: '5px',
				position: 'relative',
				outline: outline,
			}}
			className={'w-12 h-12 flex items-center justify-center rounded-full'}
		>
			<SelectedNodeIndicator selected={selected} />
			{/*<input type={"file"} accept={"audio/*"} onChange={onChange}></input>*/}
			<label
				htmlFor={inputId}
				className={`inline-block w-5 h-5 rounded-full bg-white ${
					data?.url ? 'cursor-not-allowed' : 'cursor-pointer'
				}`}
			>
				<img src={soundLogo} alt="une icone symbolisant une note de musique" />
			</label>
			<input
				type="file"
				id={inputId}
				className="hidden"
				accept="audio/*"
				onChange={onChange}
				disabled={data?.url}
			/>
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

export default memo(SoundImage);
