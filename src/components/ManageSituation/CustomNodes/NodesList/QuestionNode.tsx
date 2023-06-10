import { memo, useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import SelectedNodeIndicator from '../SelectedNodeIndicator';

const QuestionNode = ({ data, isConnectable, selected }: any) => {
	const [text, setText] = useState(data.label);

	const onChange = useCallback(
		(evt: any) => {
			setText(evt.target.value);
			data.label = evt.target.value;
		},
		[setText, data]
	);
	const outline = selected ? '2px solid blue' : '0px';

	return (
		<div
			style={{
				border: '1px solid orange',
				padding: '5px',
				width: '400px',
				outline: outline,
			}}
		>
			<SelectedNodeIndicator selected={selected} />
			<Handle
				type="target"
				position={Position.Top}
				style={{ borderRadius: 0 }}
				isConnectable
				id="a"
				className="!bg-teal-500 !w-[50px]"
			/>
			<textarea
				className="nodeText"
				value={text}
				onChange={onChange}
			></textarea>
			<Handle
				type="source"
				position={Position.Bottom}
				style={{ borderRadius: 0 }}
				isConnectable
				id="b"
				className="!bg-teal-500 !w-[50px]"
			/>
			<Handle
				type="source"
				position={Position.Left}
				style={{ borderRadius: 0 }}
				isConnectable
				id="c"
				className="!bg-teal-500 !h-[10px]"
			/>
		</div>
	);
};

export default memo(QuestionNode);
