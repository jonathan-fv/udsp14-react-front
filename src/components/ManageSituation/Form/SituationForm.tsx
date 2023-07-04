import './SituationForm.css';
import React, { useCallback, useEffect, useState } from 'react';
import API from '../../../services/API';
import { useParams } from 'react-router-dom';

type CreateSituationFormProps = {
	onUpdate: (newStore: { description: string; title: string }) => void;
	id?: string | undefined;
};
const SituationForm: React.FC<CreateSituationFormProps> = ({ onUpdate }) => {
	const [title, setTitle] = useState('Titre');
	const [description, setDescription] = useState('Description');

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			API.get(`/situations/${id}`)
				.then((response) => {
					setTitle(response.data.situation.title);
					setDescription(response.data.situation.description);
					onUpdate({
						title: response.data.situation.title,
						description: response.data.situation.description,
					});
				})
				.catch((error) => console.log(error));
		}
	}, [id, onUpdate]);

	const onTitleChange = useCallback(
		(evt: React.ChangeEvent<HTMLInputElement>) => {
			const newTitle = evt.target.value;
			setTitle(newTitle);
			onUpdate({ title: newTitle, description });
		},
		[onUpdate, description]
	);

	const onDescChange = useCallback(
		(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
			const newDescription = evt.target.value;
			setDescription(newDescription);
			onUpdate({ title, description: newDescription });
		},
		[onUpdate, title]
	);

	return (
		<div className={'formSituation dark:bg-gray-900 rounded min-h-fit'}>
			<div className={'labelGroup'}>
				<label className={'labelSituation'} htmlFor={'titleSituation'}>
					Titre de la situation
				</label>
				<input
					className={'inputSituation'}
					id={'titleSituation'}
					onChange={onTitleChange}
					placeholder={title}
				/>
			</div>
			<div className={'labelGroup'}>
				<label className={'labelSituation'} htmlFor={'descriptionSituation'}>
					Description de la situation
				</label>
				<textarea
					className={'inputSituation textSituation'}
					id={'descriptionSituation'}
					onChange={onDescChange}
					placeholder={description}
				/>
			</div>
			{/*<button type={"button"} className={"buttonSituation"}>Valider</button>*/}
		</div>
	);
};

export default SituationForm;
