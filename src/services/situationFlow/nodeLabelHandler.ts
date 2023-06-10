export const nodeLabelHandler = (nodeType: string) => {
	let label: string;
	switch (nodeType) {
		case 'question':
			label = 'Question';
			break;
		case 'image':
			label = 'Image';
			break;
		case 'sound':
			label = 'Son';
			break;
		case 'input':
			label = 'Début de la situation';
			break;
		case 'output':
			label = 'Fin de situation';
			break;
		case 'answer':
			label = 'Réponse';
			break
		default:
			label = 'Inconnue';
			break;
	}
	return label;
}