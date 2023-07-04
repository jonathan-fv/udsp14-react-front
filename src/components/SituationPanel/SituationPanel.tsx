import './SituationPanel.css';
import { useNavigate } from 'react-router-dom';

const SituationPanel = (props: {
	id: string;
	title: string;
	desc: string;
	delete: any;
}) => {
	const navigate = useNavigate();

	return (
		<>
			<div className="p-3 bg-amber-100 rounded-lg flex flex-col gap-3 w-full">
				<div className="text-center text-2xl font-bold">
					<p>{props.title}</p>
				</div>
				<div className="h-0.5 bg-amber-300 rounded-lg"/> {/* divider */}
				<div className="panel-description">
					<p>{props.desc}</p>
				</div>
				<div className="flex justify-end gap-3">
					<button
						className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-100 hover:text-green-600"
						onClick={() =>
							navigate(`/administration/edit-situation/${props.id}`)
						}
					>
						Éditer
					</button>
					<button
						className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-100 hover:text-red-600"
						onClick={props.delete}
					>
						Supprimer
					</button>
				</div>
			</div>
		</>
	);
};

export default SituationPanel;
