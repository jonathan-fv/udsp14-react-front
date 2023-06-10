import { Connection, Node } from 'reactflow';

export const edgeConnectionChecker = (
	connection: Connection,
	nodes: Node[]
) => {
	const sourceNode = nodes.find((node) => node.id === connection.source);
	const targetNode = nodes.find((node) => node.id === connection.target);

	if (sourceNode && targetNode) {
		if (
			// Define the valid connections here
			(sourceNode.type === 'initial' && targetNode.type === 'answer') ||
			(sourceNode.type === 'answer' && targetNode.type === 'question') ||
			(sourceNode.type === 'answer' && targetNode.type === 'final') ||
			(sourceNode.type === 'question' && targetNode.type === 'answer') ||
			(targetNode.type === 'output' && sourceNode.type === 'answer') ||
			(targetNode.type === 'sound' &&
				['question', 'answer', 'initial', 'final'].includes(
					sourceNode.type as string
				)) ||
			(targetNode.type === 'image' &&
				['question', 'answer', 'initial', 'final'].includes(
					sourceNode.type as string
				))
		) {
			return true;
		}
	}

	return false;
};
