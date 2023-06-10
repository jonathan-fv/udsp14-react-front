import React, { MutableRefObject } from 'react';
import { nodeLabelHandler } from './nodeLabelHandler';
import { ReactFlowInstance } from 'reactflow';

export const handleNodeDrop = (
	event: React.DragEvent<HTMLDivElement>,
	reactFlowWrapper: MutableRefObject<any>,
	reactFlowInstance: ReactFlowInstance<any, any> | null,
	getId: (type: string) => string
) => {
	// @ts-ignore
	const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
	const type = event.dataTransfer.getData('application/reactflow');
	const situationType = event.dataTransfer.getData('application/situationType');

	// check if the dropped element is valid
	if (typeof type === 'undefined' || !type) {
		return;
	}
	// @ts-ignore
	const position = reactFlowInstance.project({
		x: event.clientX - reactFlowBounds!.left,
		y: event.clientY - reactFlowBounds!.top,
	});

	return {
		id: getId(type),
		type,
		position,
		data: { label: nodeLabelHandler(situationType) },
	};
};
