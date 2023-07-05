import { ReactFlowJsonObject } from 'reactflow';

type NormalizeFlowDataProps = {
	flowData: ReactFlowJsonObject;
	formStoreRef: any;
};

export const normalizeFlowData = ({
	flowData,
	formStoreRef,
}: NormalizeFlowDataProps) => {
	const updatedNodes = flowData.nodes.map((node) => {
		const { id, type, data } = node;
		const edges = flowData.edges.filter((edge) => edge.source === id);
		return { id, type, data, edges };
	});

	const filteredArray = updatedNodes.map(
		(obj: { data?: any; edges?: any; id?: any; type?: any }) => {
			const { id, type } = obj;
			const { label } = obj.data;
			const targets = obj.edges
				.map((edge: { target: any }) => edge.target)
				.filter((target: any) => {
					const targetObj = updatedNodes.find(
						(node: { id: any }) => node.id === target
					);
					return targetObj?.type !== 'image' && targetObj?.type !== 'sound';
				});

			const media = obj.edges
				.filter((edge: { target: any }) => {
					const targetObj = updatedNodes.find(
						(node: { id: any }) => node.id === edge.target
					);
					return targetObj?.type === 'image' || targetObj?.type === 'sound';
				})
				.map((edge: { target: any }) => {
					const targetObj = updatedNodes.find(
						(node: { id: any }) => node.id === edge.target
					);
					return {
						id: targetObj?.data.storeId,
						name: targetObj?.data.label,
						type: targetObj?.type,
						url: targetObj?.data.url
					};
				});

			return { id, label, type, targets, media };
		}
	);

	const localStorageKey = 'raw';
	const flow = 'flow';
	const situation = 'situation';
	localStorage.setItem(situation, JSON.stringify(formStoreRef.current));
	localStorage.setItem(flow, JSON.stringify(filteredArray));
	localStorage.setItem(localStorageKey, JSON.stringify(flowData));

	return {
		situation: formStoreRef.current,
		flow: filteredArray,
		raw: flowData,
	};
};
