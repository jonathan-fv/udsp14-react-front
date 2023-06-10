import { Node } from 'reactflow';
import React from 'react';

type IsSaveDisabled = {
	disabled: boolean;
	message: string;
};

export const saveChecker = (
	nodes: Node[],
	formStoreRef: { title: string; description: string } | null,
	setIsSaveDisabled: React.Dispatch<React.SetStateAction<IsSaveDisabled>>
) => {
	const initialNode = nodes.find((node) => node.type === 'initial');
	const finalNode = nodes.find((node) => node.type === 'final');
	const questionNodes = nodes.filter((node) => node.type === 'question');
	const answerNodes = nodes.filter((node) => node.type === 'answer');

	const hasEnoughNodes = nodes.length >= 2;
	const hasTitleAndDescription =
		formStoreRef?.title && formStoreRef?.description;
	const hasMinimumQuestionAndAnswers =
		questionNodes.length >= 1 && answerNodes.length >= 2;

	if (!hasEnoughNodes || !initialNode || !finalNode) {
		return setIsSaveDisabled({
			disabled: true,
			message: 'Merci de terminer la situation avant de la sauvegarder',
		});
	}

	if (!hasTitleAndDescription) {
		return setIsSaveDisabled({
			disabled: true,
			message: 'Merci de renseigner un titre et une description',
		});
	}

	if (!hasMinimumQuestionAndAnswers) {
		return setIsSaveDisabled({
			disabled: true,
			message: 'Merci de renseigner au minimum une question et deux réponses',
		});
	}

	return setIsSaveDisabled({ disabled: false, message: '' });
};
