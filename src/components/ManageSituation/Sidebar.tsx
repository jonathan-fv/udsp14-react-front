import React from 'react';
import './SituationFlow.css';

type SidebarProps = {
	onRestore: () => void;
	onSave: () => void;
	onDelete: () => void;
	selectedNode: any;
	isSaveDisabled: { disabled: boolean; message: string };
};

const Sidebar = ({
	onRestore,
	onSave,
	onDelete,
	selectedNode,
	isSaveDisabled,
}: SidebarProps) => {
	// @ts-ignore
	const onDragStart = (event, nodeType, situationType) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.setData('application/situationType', situationType);
		event.dataTransfer.effectAllowed = 'move';
	};

	const deleteDisabled =
		selectedNode?.type === 'initial' || selectedNode?.type === 'final';

	const buttonDeleteClass = deleteDisabled
		? 'border border-gray-200 p-3 bg-gray-200 text-gray-400 cursor-not-allowed'
		: 'border border-red-600 p-3 hover:bg-red-600 hover:text-white rounded';

	const buttonSaveClass = isSaveDisabled.disabled
		? 'border border-gray-200 p-3 bg-gray-200 text-gray-400 cursor-not-allowed'
		: 'border border-blue-600 p-3 hover:bg-blue-600 hover:text-white rounded';

	return (
		<aside className="flex flex-col md:gap-6 gap-3 p-3">
			<div className="flex justify-center gap-3">
				<button
					className="border border-blue-600 px-3 py-2 rounded hover:bg-blue-600 hover:text-white"
					onClick={onRestore}
				>
					Restaurer
				</button>
				<button
					className={buttonSaveClass}
					onClick={onSave}
					disabled={isSaveDisabled.disabled}
				>
					Sauvegarder
				</button>
			</div>
			{isSaveDisabled.disabled && (
				<p className="text-red-600 text-xs text-center">
					{isSaveDisabled.message}
				</p>
			)}
			<div className="h-[1px] bg-gray-200" />
			<div className="description">
				Vous pouvez glisser-déposer les éléments suivants sur le canvas pour
				créer une situation:
			</div>
			<div className="flex flex-col justify-center gap-1">
				<div
					className="dndnode !border-blue-600"
					onDragStart={(event) => onDragStart(event, 'question', 'question')}
					draggable
				>
					Question
				</div>
				<div
					className="dndnode !border-orange-600"
					onDragStart={(event) => onDragStart(event, 'answer', 'answer')}
					draggable
				>
					Réponse
				</div>
				<div
					className="dndnode !border-purple-600"
					onDragStart={(event) => onDragStart(event, 'sound', 'sound')}
					draggable
				>
					Son
				</div>
				<div
					className="dndnode !border-yellow-600"
					onDragStart={(event) => onDragStart(event, 'image', 'image')}
					draggable
				>
					Image
				</div>
			</div>
			<div className="h-[1px] bg-gray-200" />
			<div className="flex flex-col justify-center gap-3">
				<p className="text-center">Node séléctionné:</p>
				<p>{selectedNode?.data?.label}</p>
				{selectedNode && (
					<button
						className={buttonDeleteClass}
						onClick={onDelete}
						disabled={deleteDisabled}
					>
						Supprimer
					</button>
				)}
				{deleteDisabled && (
					<p className="text-center text-red-500">
						Vous ne pouvez pas supprimer ce noeud
					</p>
				)}
			</div>
		</aside>
	);
};

export default Sidebar;
